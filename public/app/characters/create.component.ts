import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
 
import { AbilitiesRollComponent } from './abilities/abilities_roll.component';
import { CharacterInfoComponent } from './info.component';
import { ClassChooseComponent } from './classes/class_choose.component';
import { RaceChooseComponent } from './races/race_choose.component';
import { SkillsChooseComponent } from './skills/skills_choose.component';

import { AbilitiesService } from './abilities/abilities.service';
import { CharacterInfoService } from './info.service';
import { SkillsService } from './skills/skills.service';

@Component({
    templateUrl: '/partials/characters/create',
    directives: [ROUTER_DIRECTIVES, AbilitiesRollComponent, CharacterInfoComponent, ClassChooseComponent, RaceChooseComponent, SkillsChooseComponent],
    providers: [AbilitiesService, CharacterInfoService, SkillsService]
})

export class CharacterCreateComponent {

  constructor() { }

}
