import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HelpComponent } from '../common/help.component';

import { AbilitiesService } from './abilities.service';

import { AbilityScorePipe } from './ability_score.pipe';
import { AbilityModifierPipe } from './ability_modifier.pipe';
 
@Component({
    selector: 'ability-scores-roll',
    templateUrl: '/partials/abilities/roll',
    directives: [ROUTER_DIRECTIVES, HelpComponent],
    providers: [AbilitiesService],
    pipes: [AbilityScorePipe, AbilityModifierPipe]
})

export class AbilitiesRollComponent {
  public abilities;
  public points;
  public roll_method;
  public roll_methods;
  public rules;
  public scores: number[];

  private event_timer;

  constructor(private service: AbilitiesService) { }

  ngOnInit() {
    this.abilities = [];
    this.points = {
      getUsed: (scores = this.scores) => {
        let price_increase_scores = _.clone(this.points.price_increase_scores);

        price_increase_scores.unshift(this.rules.min);

        let price_increase_scores_length = price_increase_scores.length;

        return this.scores.reduce((used_points, score) => {
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

          return used_points;
        }, 0);
      },
      hasExceededMax: (scores = this.scores) => {
        console.log(this.points.getUsed(scores));
        return this.points.getUsed(scores) > this.points.max;
      },
      price_increase_scores: [13,15],
      max: 27
    };
    this.roll_method = {};
    this.roll_methods = [];
    this.rules = {
      is_orderable: false,
      min: this.service.min_base_score,
      max: this.service.max_base_score
    };
    this.scores = [0,0,0,0,0,0];

    this.service.getInfo(info => {
      this.abilities = info.abilities;
      this.roll_methods = info.ability_roll_methods;

      this.setRollMethod(0);
    });
  }

  setRollMethod (index) {
    this.roll_method = this.roll_methods[index];

    this.rules.min = this.service.min_base_score;
    this.rules.max = this.service.max_base_score;

    switch (this.roll_method._id) {
      case "point_buy":
        this.scores = [8,8,8,8,8,8];
        this.rules.min = 8;
        this.rules.max = 15;
        break;
      case "custom":
        break;
      case "roll":
        this.scores = [0,0,0,0,0,0];
        break;
      case "standard_array":
      default:
        this.scores = [15,14,13,12,10,8];
        break;
    }

    this.setOrderability(this.roll_method.is_orderable);
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

    let abilities_count = this.abilities.length;

    for (let i = 0; i < abilities_count; i++) {
      let rollResults = this.rollScore(dice_count);

      this.scores[i] = rollResults.score;
    }
  }

  setOrderability (is_orderable) {
    this.rules.is_orderable = is_orderable;
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

    return {
      score: score
    }
  }

  areScoresSet () {
    let scores = this.scores;

    if (!(scores.length === 6 && Array.isArray(scores))) {
      return false;
    }

    if (_.max(scores) === 0) {
      return false;
    }

    return true;
  }

  swapScores (i1: number, i2: number) {
    let last_index = this.scores.length - 1;

    if (i1 < 0) {
      i1 = last_index;
    } else if (i1 > last_index) {
      i1 = 0;
    }

    if (i2 < 0) {
      i2 = last_index;
    } else if (i2 > last_index) {
      i2 = 0;
    }

    if (i1 == i2) {
      return;
    }

    let scores = this.scores,
    tmp = scores[i2];

    scores[i2] = scores[i1];
    scores[i1] = tmp;
  }

  private incrementScore (i: number, n: number) {
    let old_score = this.scores[i];

    this.scores[i] = _.clamp(old_score + n, this.rules.min, this.rules.max);

    if (this.roll_method._id !== "point_buy" || n <= 0) {
      return;
    }

    n = Math.max(n, this.scores[i] - old_score);

    while (n > 0 && this.points.hasExceededMax()) {
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
}
