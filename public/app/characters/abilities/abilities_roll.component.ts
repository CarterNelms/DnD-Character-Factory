import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { CheckboxComponent } from '../../common/checkbox.component';
import { HelpComponent } from '../../common/help.component';

import { AbilitiesService } from './abilities.service';

import { AbilityBonusPipe } from './ability_bonus.pipe';
import { AbilityModifierPipe } from './ability_modifier.pipe';
import { AbilityScorePipe } from './ability_score.pipe';
import { ObjToArrPipe } from '../../common/obj_to_arr.pipe';
 
@Component({
  selector: 'ability-scores-roll',
  templateUrl: '/partials/characters/abilities/roll',
  directives: [ROUTER_DIRECTIVES, CheckboxComponent, HelpComponent],
  providers: [],
  pipes: [AbilityBonusPipe, AbilityModifierPipe, AbilityScorePipe, ObjToArrPipe]
})

export class AbilitiesRollComponent {
  public abilities;
  public bonuses;
  public points;
  public roll_method_id;
  public roll_methods;
  public rules;
  public scores: number[];

  private event_timer;

  constructor(private service: AbilitiesService) { }

  ngOnInit() {
    this.abilities = {};
    this.bonuses = this.service.bonuses;
    this.points = {
      private getUsed: () => {
        let price_increase_scores = _.clone(this.points.price_increase_scores);

        price_increase_scores.unshift(this.rules.min);

        let price_increase_scores_length = price_increase_scores.length,
        used_points = 0;

        _.each(this.scores, score => {
          let price_increase_scores_index = 0,
          last_price_increase_score = 0;

          while (score > 0 && price_increase_scores_index <= price_increase_scores_length) {
            if (price_increase_scores_index !== 0) {
              used_points += score;
            }

            let price_increase_score = price_increase_scores[price_increase_scores_index];

            score -= price_increase_score - last_price_increase_score;
            last_price_increase_score = price_increase_score;
            price_increase_scores_index++;
          }
        });

        return used_points;
      },
      get used () {
        return this.getUsed();
      },
      get hasExceededMax () {
        return this.used > this.max;
      },
      price_increase_scores: [13,15],
      max: 27
    };
    this.roll_method_id = null;
    this.roll_methods = [];
    this.rules = {
      is_orderable: false,
      min: this.service.min_base_score,
      max: this.service.max_base_score
    };
    this.scores = this.service.scores;

    this.service.getInfo(info => {
      let abilities = {};

      _.each(info.abilities, (ability, index) => {
        ability.index = index;
        this.service.abilities[ability._id] = ability;
      });

      this.abilities = this.service.abilities;
      let roll_methods = {};
      info.ability_roll_methods.forEach(method => {
        roll_methods[method._id] = method;
      });

      this.roll_methods = roll_methods;

      this.roll_method = this.roll_methods["standard_array"];
    });
  }

  set roll_method (method) {
    this.roll_method_id = method ? method._id : null;

    this.rules.min = this.service.min_base_score;
    this.rules.max = this.service.max_base_score;

    let scores = null;

    switch (this.roll_method_id) {
      case "point_buy":
        scores = [8,8,8,8,8,8];
        this.rules.min = 8;
        this.rules.max = 15;
        break;
      case "custom":
        break;
      case "roll":
        scores = [0,0,0,0,0,0];
        break;
      case "standard_array":
      default:
        scores = [15,14,13,12,10,8];
        break;
    }

    this.rules.is_orderable = this.roll_method.is_orderable;

    if (!Array.isArray(scores)) {
      return;
    }

    _.each(this.abilities, (ability, ability_id) => {
      this.scores[ability_id] = scores.length === 0 ? 8 : scores.shift();
    });
  }

  get roll_method () {
    if (!this.roll_method_id) {
      return {};
    }

    return this.roll_methods[this.roll_method_id];
  }

  roll (dice_count: number) {
    // let dice_count = 0;

    // switch (this.roll_method._id) {
    //   case "3d6":
    //     dice_count = 3;
    //     break;
    //   case "4d6":
    //     dice_count = 4;
    //     break;
    //   case "5d6":
    //     dice_count = 5;
    //     break;
    //   default:;
    // }

    if (dice_count < 3) {
      return;
    }

    _.each(this.abilities, (ability, ability_id) => {
      this.scores[ability_id] = this.rollScore(dice_count);
    });
  }

  private rollScore (dice_count: number) {
    if (dice_count <= 0) {
      return {
        score: 8
      }
    }

    let dice = [];

    for (let i = 0; i < dice_count; i++) {
      dice[i] = Math.ceil(6 * Math.random());
    }

    while (dice.length > 3) {
      dice.splice(dice.indexOf(_.min(dice)), 1);
    }

    let score = dice.reduce((prev, current) => {
      return prev + current;
    }, 0);

    return score;
  }

  areScoresSet () {
    let scores = this.scores,
    total_score = 0,
    score_count = 0;

    _(scores).forEach((score) => {
      score_count++;
      total_score += score;
    });

    return !(score_count < _.size(this.abilities) || total_score === 0);
  }

  swapScores (ability_id: string, dest_index: any) {
    if (typeof dest_index === 'number') {
      let last_index = _.size(this.abilities) - 1;

      if (dest_index < 0) {
        dest_index = last_index;
      } else if (dest_index > last_index) {
        dest_index = 0;
      }

      dest_index = _.find(this.abilities, { index: dest_index })._id;
    }

    if (ability_id === dest_index || !(this.abilities[dest_index])) {
      return;
    }

    let scores = this.scores,
    tmp = scores[dest_index];

    scores[dest_index] = scores[ability_id];
    scores[ability_id] = tmp;
  }

  private incrementScore (i: number, n: number) {
    let old_score = this.scores[i];

    this.scores[i] = _.clamp(old_score + n, this.rules.min, this.rules.max);

    if (this.roll_method_id !== "point_buy" || n <= 0) {
      return;
    }

    n = Math.max(n, this.scores[i] - old_score);

    while (n > 0 && this.points.hasExceededMax) {
      this.scores[i] = _.clamp(old_score + --n, this.rules.min, this.rules.max);
    }

  }

  incrementScoreHold (i: number, n: number) {
    if (n === 0) {
      return;
    }

    let cmp = this;

    cmp.incrementScore(i, n);

    cmp.event_timer = setTimeout(
      () => {
        cmp.incrementScore(i, n);
        cmp.event_timer = setInterval(
          () => {
            cmp.incrementScore(i, n);
            let score = cmp.scores[i];
            if (score <= this.rules.min || score >= this.rules.max) {
              cmp.incrementScoreCancel();
            }
          },
          100
        );
      },
      300
    );
  }

  incrementScoreCancel () {
    clearInterval(this.event_timer);
  }

  getTotalScore (ability_id) {
    return this.service.getTotalScore(ability_id);
  }

  arePointsWasted (ability_id) {
    return this.service.getRawScore(ability_id) > this.service.max_score;
  }

  getModifier (ability_id) {
    return this.service.getModifier(ability_id);
  }
}
