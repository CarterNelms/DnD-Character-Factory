import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';

@Injectable()
export class Service{

  constructor (private http: Http) { }

  private http_get (url, fn) {
    this.http.get(url)
      .map(response => response.json())
      .subscribe(
        result => { fn(result); },
        this.handleError
      )
    ;
  }

  private extractData (res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  private arrayToObjectByObjectID (arr, retain_index: boolean = false) {
    let obj = {};
    _.each(arr, (elem, index) => {
      if (elem._id == null) {
        return;
      }
      if (retain_index) {
        elem.index = index;
      }
      obj[elem._id] = elem;
    });
    return obj;
  }
}
