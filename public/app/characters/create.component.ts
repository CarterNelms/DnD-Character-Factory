import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
 
import { AbilitiesRollComponent } from './abilities/abilities_roll.component';
// import { ClassChooseComponent } from './classes/class_choose.component';
import { RaceChooseComponent } from './races/race_choose.component';

import { CharacterCreateService } from './create.service';

@Component({
    templateUrl: '/partials/characters/create',
    directives: [ROUTER_DIRECTIVES, AbilitiesRollComponent, RaceChooseComponent],
    providers: [CharacterCreateService]
})

export class CharacterCreateComponent {

  constructor() { }

  ngOnInit() {
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
  }
}
