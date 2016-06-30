import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';

@Injectable()
export class CharactersService{
  private abilities: [];

  constructor (private http: Http) { }

  getAbilitiesInfo (fn) {
    if (this.abilities != null) {
      fn(this.abilities);
      console.log('No DB call required!!');
      return;
    }

    this.http.get('/characters/abilities-info')
      .map(response => response.json())
      // .catch(x => console.log(x))
      .subscribe(
        result => {
          this.abilities = result;
          fn(this.abilities);
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
