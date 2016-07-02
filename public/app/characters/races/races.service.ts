import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';

@Injectable()
export class RacesService{
  private races;

  constructor (private http: Http) { }

  getRaces (fn) {
    if (this.races != null) {
      fn(this.races);
      return;
    }

    this.http.get('/characters/races/get')
      .map(response => response.json())
      .subscribe(
        result => {
          this.races = result.races;
          fn(this.races);
        },
        this.handleError
      )
    ;
  }

  private extractData(res: Response) {
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
}
