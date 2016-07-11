import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { CheckboxComponent } from '../common/checkbox.component';

import { CharacterInfoService } from './info.service';
 
@Component({
  selector: 'character-info',
  templateUrl: '/partials/characters/info',
  directives: [ROUTER_DIRECTIVES, CheckboxComponent],
  providers: []
})

export class CharacterInfoComponent {
  public alignments;
  public alignment;
  public experience_points: number;
  public levels;

  constructor(private service: CharacterInfoService) { }

  ngOnInit() {
    this.alignment = {};
    this.alignments = {
      order: ['Lawful','Neutral','Chaotic'],
      morality: ['Good','Neutral','Evil']
    };
    this.setRandomAlignment();

    this.service.getLevels(levels => {
      this.levels = levels;
      this.experience_points = this.levels[Math.floor(Math.random() * this.levels.length)].experience_points;
    });
  }

  get level () {
    if (!this.levels) {
      return
    }

    if (this.levels.length === 0) {
      return;
    }

    let exp = _.clamp(this.experience_points * 1, 0, this.levels[this.levels.length - 1].experience_points);

    if (exp != this.experience_points) {
      return this.levels[0];
    }

    let i = this.levels.length,
    level;
    do {
      level = this.levels[--i];
    } while (level.experience_points > exp);

    return level;
  }

  set level (level) {
    this.experience_points = level.experience_points;
  }

  get proficiency_bonus () {
    if (!this.level) {
      return 2;
    }

    return Math.ceil(this.level.level / 4) + 1;
  }

  setAlignment (order, morality) {
    if (this.alignments.order.indexOf(order) === -1) {
      return;
    }

    if (this.alignments.morality.indexOf(morality) === -1) {
      return;
    }

    this.alignment.order = order;
    this.alignment.morality = morality;
  }

  private setRandomAlignment () {
    let order_count = this.alignments.order.length,
    morality_count = this.alignments.morality.length,
    order = this.alignments.order[Math.floor(Math.random() * order_count)],
    morality = this.alignments.morality[Math.floor(Math.random() * morality_count)];

    this.setAlignment(order, morality);
  }

  isChosenAlignment (order, morality) {
    return this.alignment.order === order && this.alignment.morality === morality;
  }
}
