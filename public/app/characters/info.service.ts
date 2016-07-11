import { Http } from "@angular/http";
import { Service } from '../base/service';

export class CharacterInfoService extends Service {
  private levels;

  constructor (private http: Http) {
    super(this.http);
  }

  getLevels (fn) {
    if (this.levels != null) {
      fn(this.levels);
      return;
    }

    super.http_get('/characters/levels/get', result => {
      this.levels = result.levels;
      fn(this.levels);
    });
  }
}
