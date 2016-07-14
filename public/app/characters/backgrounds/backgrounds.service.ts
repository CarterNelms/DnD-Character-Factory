import { Http } from "@angular/http";
import { Service } from '../../base/service';

export class BackgroundsService extends Service {
  private backgrounds;

  constructor (private http: Http) {
    this.backgrounds = {};
    super(this.http);
  }

  getBackgrounds (fn) {
    if (!_.isEmpty(this.backgrounds)) {
      fn(this.backgrounds);
      return;
    }

    super.http_get('/characters/backgrounds/get', result => {
      this.backgrounds = this.arrayToObjectByObjectID(result.backgrounds);
      fn(this.backgrounds);
    });
  }
}
