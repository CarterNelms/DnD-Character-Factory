import { Http } from "@angular/http";
import { Service } from '../base/service';

export class CharacterCreateService extends Service {
  public abilities;

  constructor (private http: Http) {
    this.abilities = {
      bonuses: {
        race: {},
        class: {},
        feat: {},
        subrace: {}
      }
    }
    super(this.http);
  }

  setAbilityBonuses (bonus_type, ability_score_increase) {
    if (!ability_score_increase) {
      return;
    }

    this.abilities.bonuses[bonus_type] = {};

    ability_score_increase.forEach((asi) => {
      this.abilities.bonuses[bonus_type][asi.ability_id] = asi.increase;
    });
  }

  setRaceAbilityBonuses (race) {
    let traits = race.traits;
    if (!traits) {
      return;
    }

    let ability_score_increase = traits.ability_score_increase;

    this.setAbilityBonuses('race', ability_score_increase);
  }

  setSubraceAbilityBonuses (subrace) {
    let traits = subrace.traits;

    let ability_score_increase = !traits ? [] : traits.ability_score_increase;

    this.setAbilityBonuses('subrace', ability_score_increase);
  }
}
