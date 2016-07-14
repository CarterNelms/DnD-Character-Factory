import { Http } from "@angular/http";
import { Service } from '../../base/service';

export class RacesService extends Service {
  private races;

  constructor (private http: Http) {
    this.races = {};
    super(this.http);
  }

  getRaces (fn) {
    if (!_.isEmpty(this.races)) {
      fn(this.races);
      return;
    }

    super.http_get('/characters/races/get', result => {
      let races = _.map(result.races, race => {
        race.subraces = this.arrayToObjectByObjectID(race.subraces);
        return race;
      });
      this.races = this.arrayToObjectByObjectID(races);
      fn(this.races);
    });
  }
}
