import { Http } from "@angular/http";
import { Service } from '../../base/service';

export class RacesService extends Service {
  private races;

  constructor (private http: Http) {
    super(this.http);
  }

  getRaces (fn) {
    if (this.races != null) {
      fn(this.races);
      return;
    }

    super.http_get('/characters/races/get', result => {
      this.races = result.races;
      fn(this.races);
    });
  }
}