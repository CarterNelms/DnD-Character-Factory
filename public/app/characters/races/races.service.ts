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
      let races = {};
      result.races.forEach(race => {
        let subraces = {};
        race.subraces.forEach(subrace => {
          subraces[subrace._id] = subrace;
        });
        race.subraces = subraces;
        races[race._id] = race;
      });

      this.races = races;
      fn(this.races);
    });
  }
}
