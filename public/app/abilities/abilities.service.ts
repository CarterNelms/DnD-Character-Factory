import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AbilitiesService{
  private info: [];

  public max_base_score: number;
  public min_base_score: number;

  constructor (private http: Http) {
    this.min_base_score = 3;
    this.max_base_score = 18;
  }

  getInfo (fn) {
    if (this.info != null) {
      fn(this.info);
      console.log('No DB call required!!');
      return;
    }

    this.http.get('/abilities/get-info')
      .map(response => response.json())
      // .catch(x => console.log(x))
      .subscribe(
        result => {
          this.info = result;
          fn(this.info);
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
