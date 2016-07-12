import { Http } from "@angular/http";
import { Service } from '../base/service';

export class CharacterInfoService extends Service {
  private experience_points: number;
  private levels;

  constructor (private http: Http) {
    this.levels = [];
    this.experience_points = 0;
    super(this.http);
  }

  getLevels (fn) {
    if (!_.isEmpty(this.levels)) {
      fn(this.levels);
      return;
    }

    super.http_get('/characters/levels/get', result => {
      this.levels = result.levels;
      fn(this.levels);
    });
  }

  get level () {
    if (_.isEmpty(this.levels)) {
      return null;
    }

    let exp = _.clamp(this.experience_points * 1, 0, this.levels[this.levels.length - 1].experience_points);

    let i = this.levels.length,
    level;
    do {
      level = this.levels[--i];
    } while (level.experience_points > exp && i > 0);

    return level;
  }

  set level (level) {
    this.experience_points = level.experience_points;
  }

  get proficiency_bonus () {
    let level = this.level;

    if (!level) {
      return 2;
    }

    return Math.ceil(level.level / 4) + 1;
  }
}
