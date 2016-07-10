import { Http } from "@angular/http";
import { Service } from '../../base/service';

export class AbilitiesService extends Service {
  public abilities;
  public bonuses;
  public info;
  public min_base_score: number;
  public max_base_score: number;
  public min_score: number;
  public max_score: number;
  public scores;

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
    this.scores = {};

    super(this.http);
  }

  private getBlankBonuses () {
    return {
      custom: []
    };
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

  // setRaceBonuses (race) {
  //   let traits = race.traits;
  //   if (!traits) {
  //     return;
  //   }

  //   let score_increases = this.getScoreIncreasesFromTraits(traits);

  //   this.setBonuses('race', score_increases);
  // }

  // setSubraceBonuses (subrace) {
  //   let traits = subrace.traits;

  //   let score_increases = !traits ? [] : this.getScoreIncreasesFromTraits(traits);

  //   this.setBonuses('subrace', score_increases);
  // }

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
    return _.clamp(this.getRawScore(ability_id), this.min_score, this.max_score);
  }

  private getRawScore (ability_id) {
    return this.scores[ability_id]
      + (this.bonuses.race[ability_id] | 0)
      + (this.bonuses.subrace[ability_id] | 0)
    ;
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
