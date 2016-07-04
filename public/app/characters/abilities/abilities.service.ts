import { Http } from "@angular/http";
import { Service } from '../../base/service';

export class AbilitiesService extends Service {
  private info;

  public min_base_score: number;
  public max_base_score: number;
  public min_score: number;
  public max_score: number;

  constructor (private http: Http) {
    this.min_base_score = 3;
    this.max_base_score = 18;
    this.min_score = this.min_base_score;
    this.max_score = 20;
    super(this.http);
  }

  getInfo (fn) {
    if (this.info != null) {
      fn(this.info);
      return;
    }

    super.http_get('/characters/abilities/get-info', result => {
      this.info = result;
      fn(this.info);
    });
  }
}
