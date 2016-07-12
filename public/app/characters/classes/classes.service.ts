import { Http } from "@angular/http";
import { Service } from '../../base/service';

export class ClassesService extends Service {
  private classes;

  constructor (private http: Http) {
    this.classes = {};
    super(this.http);
  }

  getClasses (fn) {
    if (!_.isEmpty(this.classes)) {
      fn(this.classes);
      return;
    }

    super.http_get('/characters/classes/get', result => {
      let classes = {};
      result.classes.forEach(clss => {
        classes[clss._id] = clss;
      });

      this.classes = classes;
      fn(this.classes);
    });
  }
}
