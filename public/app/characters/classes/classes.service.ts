import { Http } from "@angular/http";
import { Service } from '../../base/service';

export class ClassesService extends Service {
  private classes;

  constructor (private http: Http) {
    super(this.http);
  }

  getClasses (fn) {
    if (this.classes != null) {
      fn(this.classes);
      return;
    }

    super.http_get('/characters/classes/get', result => {
      this.classes = result.classes;
      fn(this.classes);
    });
  }
}
