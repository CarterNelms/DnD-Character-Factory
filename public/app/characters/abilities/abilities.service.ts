import { Http } from "@angular/http";
import { Service } from '../../base/service';

export class AbilitiesService extends Service {
  public abilities;
  public bonuses;
  public min_base_score: number;
  public max_base_score: number;
  public min_score: number;
  public max_score: number;
  public roll_methods;
  public scores: number[];

  constructor (private http: Http) {
    this.abilities = {};
    this.bonuses = {
      race: this.getBlankBonuses(),
      subrace: this.getBlankBonuses()
    };
    this.min_base_score = 1;
    this.max_base_score = 20;
    this.min_score = this.min_base_score;
    this.max_score = 20;
    this.roll_methods = {};
    this.scores = {};

    super(this.http);
  }

  private getBlankBonuses () {
    return {
      custom: []
    };
  }

  getInfo (fn) {
    if (!_.isEmpty(this.abilities) && !_.isEmpty(this.roll_methods)) {
      fn(this.abilities, this.roll_methods);
      return;
    }

    super.http_get('/characters/abilities/get-info', result => {
      this.abilities = this.arrayToObjectByObjectID(result.abilities, true);
      this.roll_methods = this.arrayToObjectByObjectID(result.ability_roll_methods);
      fn(this.abilities, this.roll_methods);
    });
  }

  setBonusesFromTraits (bonus_type, traits) {
    if (!this.bonuses[bonus_type]) {
      return;
    }

    let score_increases = this.getScoreIncreasesFromTraits(traits);

    this.bonuses[bonus_type] = this.getBlankBonuses();

    score_increases.forEach((asi) => {
      if (asi.ability_id === "") {
        this.bonuses[bonus_type].custom.push(asi.increase);
        return;
      }
      this.bonuses[bonus_type][asi.ability_id] = asi.increase;
    });
  }

  private getScoreIncreasesFromTraits (traits) {
    let score_increases = [];

    if (!Array.isArray(traits)) {
      return score_increases;
    }

    traits.forEach(trait => {
      if (!trait.ability_score_increases) {
        return;
      }

      score_increases = score_increases.concat(trait.ability_score_increases);
    });

    return score_increases;
  }

  getTotalScore (ability_id) {
    let raw_score = this.getRawScore(ability_id);
    return raw_score === 0 ? 0 : _.clamp(raw_score, this.min_score, this.max_score);
  }

  private getRawScore (ability_id) {
    let base_score = this.scores[ability_id];
    return base_score === 0 ? 0 : (this.scores[ability_id]
      + (this.bonuses.race[ability_id] | 0)
      + (this.bonuses.subrace[ability_id] | 0)
    );
  }

  getModifier (ability_id) {
    if (this.scores[ability_id] < this.min_base_score) {
      return null;
    }

    let min = this.min_score - 1,
    max = this.max_score,
    score = _.clamp(Math.floor(this.getTotalScore(ability_id)), min, max);

    return Math.floor((score - 10) / 2);
  }
}
