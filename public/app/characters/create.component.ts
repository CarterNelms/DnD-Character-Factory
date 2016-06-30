import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HelpComponent } from '../common/help.component';

import { CharactersService } from './characters.service';
import { AbilityScorePipe } from '../abilities/ability_score.pipe';
import { AbilityModifierPipe } from '../abilities/ability_modifier.pipe';
 
@Component({
    templateUrl: '/partials/characters/create',
    directives: [ROUTER_DIRECTIVES, HelpComponent],
    providers: [CharactersService],
    pipes: [AbilityScorePipe, AbilityModifierPipe]
})

export class CharacterCreateComponent {
  public abilities;
  public abilityRollMethod;
  public abilityRollMethods;
  public abilityScores: number[];

  constructor(private service: CharactersService) { }

  ngOnInit() {
    this.abilities = {
      abilities: [],
      rules: {
        is_orderable: false
      },
      roll_method: {},
      roll_methods: [],
      scores: [0,0,0,0,0,0]
    };
    // this.abilities = [];
    // this.abilityRollMethod = {};
    // this.abilityRollMethods = [];
    // this.abilityScores = [0,0,0,0,0,0];

    // $('select').select2({
    //   minimumResultsForSearch: -1
    // }).on(
    //     'change',
    //     (e) => this._selectedFields = $(e.target).val()
    // );

    // $('input').iCheck({
    //   checkboxClass: 'icheckbox_minimal-orange',
    //   radioClass: 'iradio_minimal-orange',
    //   increaseArea: '20%' // optional
    // });

    this.service.getAbilitiesInfo(abilities_info => {
      this.abilities.roll_methods = abilities_info.abilityRollMethods;
      this.abilities.abilities = abilities_info.abilities;

      this.setAbilityRollMethod(0);
    });
  }

  setAbilityRollMethod (index) {
    let abilities = this.abilities,
    roll_method = abilities.roll_methods[index];

    abilities.roll_method = roll_method;

    switch (roll_method._id) {
      case "point_buy":
        abilities.scores = [8,8,8,8,8,8];
        break;
      case "3d6":
      case "4d6":
      case "5d6":
        abilities.scores = [0,0,0,0,0,0];
        break;
      case "custom":
        break;
      case "standard_array":
      default:
        abilities.scores = [15,14,13,12,10,8];
        break;
    }

    this.setAbilityScoreOrderability(roll_method.is_orderable);
  }

  rollAbilities () {
    let dice_count = 0;

    switch (this.abilities.roll_method._id) {
      case "3d6":
        dice_count = 3;
        break;
      case "4d6":
        dice_count = 4;
        break;
      case "5d6":
        dice_count = 5;
        break;
      default:;
    }

    if (dice_count === 0) {
      return;
    }

    let abilities_count = this.abilities.abilities.length;

    for (let i = 0; i < abilities_count; i++) {
      let rollResults = this.rollAbilityScore(dice_count);

      this.abilities.scores[i] = rollResults.score;
    }
  }

  setAbilityScoreOrderability (is_orderable) {
    this.abilities.rules.is_orderable = is_orderable;
  }

  private rollAbilityScore (dice_count: number) {
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

  areAbilityScoresSet () {
    let scores = this.abilities.scores;

    if (!(scores.length === 6 && Array.isArray(scores))) {
      return false;
    }

    if (_.max(scores) === 0) {
      return false;
    }

    return true;
  }

  swapAbilityScore (i1: number, i2: number) {
    let last_index = this.abilities.abilities.length - 1;

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

    let scores = this.abilities.scores,
    tmp = scores[i2];

    scores[i2] = scores[i1];
    scores[i1] = tmp;
  }

  private incrementAbilityScore (i: number, n: number) {
    this.abilities.scores[i] = _.clamp(this.abilities.scores[i] + n, 3, 18);
  }

  incrementAbilityScoreHold (i: number, n: number) {
    let cmp = this;

    cmp.incrementAbilityScore(i, n);

    cmp.eventTimer = setTimeout(
      () => {
        cmp.incrementAbilityScore(i, n);
        cmp.eventTimer = setInterval(
          () => {
            cmp.incrementAbilityScore(i, n);
            if (cmp.abilities.scores[i] === 3 || cmp.abilities.scores[i] === 18) {
              cmp.incrementAbilityScoreCancel();
            }
          },
          100
        );
      },
      300
    );
  }

  incrementAbilityScoreCancel () {
    clearInterval(this.eventTimer);
  }
}
