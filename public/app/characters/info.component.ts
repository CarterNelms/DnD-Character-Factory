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

  constructor(private service: CharacterInfoService) { }

  ngOnInit() {
    this.alignment = {
      get chosen () {
        let alignment = `${this.order} ${this.morality}`;
        if (alignment === "Neutral Neutral") { alignment = "True Neutral"; }
        return alignment;
      }
    };
    this.alignments = {
      order: ['Lawful','Neutral','Chaotic'],
      morality: ['Good','Neutral','Evil']
    };

    this.service.getLevels(levels => {
      this.experience_points = this.levels[Math.floor(Math.random() * this.levels.length)].experience_points;
    });
    
    this.setRandomAlignment();
  }

  get experience_points () {
    return this.service.experience_points;
  }

  set experience_points (experience_points) {
    this.service.experience_points = experience_points;
  }

  get level () {
    return this.service.level;
  }

  set level (level) {
    this.service.level = level;
  }

  get levels () {
    return this.service.levels;
  }

  get proficiency_bonus () {
    return this.service.proficiency_bonus;
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
