import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { CheckboxComponent } from '../../common/checkbox.component';

import { AbilitiesService } from '../abilities/abilities.service';
import { CharacterInfoService } from '../info.service';
import { SkillsService } from './skills.service';
 
import { AbilityModifierPipe } from '../abilities/ability_modifier.pipe';
import { ObjToArrPipe } from '../../common/obj_to_arr.pipe';

@Component({
  selector: 'skills-choose',
  templateUrl: '/partials/characters/skills/choose',
  directives: [ROUTER_DIRECTIVES, CheckboxComponent],
  providers: [],
  pipes: [AbilityModifierPipe, ObjToArrPipe]
})

export class SkillsChooseComponent {

  constructor(private service: SkillsService, private abilities_service: AbilitiesService, private info_service: CharacterInfoService) { }

  ngOnInit() {
    this.service.getSkills(skills => {
      this.service.determineAllAllowedProficiencies();
    });
  }

  get abilities () {
    return this.abilities_service.abilities;
  }

  get scores () {
    return this.abilities_service.scores;
  }

  get skills () {
    return this.service.skills;
  }

  get proficiencies () {
    return this.service.proficiencies;
  }

  get proficiency_bonus () {
    return this.info_service.proficiency_bonus;
  }

  getModifier (skill_id) {
    let ability_modifier = this.abilities_service.getModifier(this.skills[skill_id].ability_id);

    if (ability_modifier === null) {
      return null;
    }

    return ability_modifier + (this.isProficient(skill_id) ? this.proficiency_bonus : 0);
  }

  setProficiency (skill_id, is_proficient = false) {
    this.service.setProficiency(skill_id, is_proficient);
  }

  isProficient (skill_id) {
    if (!this.proficiencies) {
      return false;
    }

    if (!this.proficiencies.is_proficient) {
      return false;
    }

    return this.proficiencies.is_proficient[skill_id];
  }

  isProficiencyOptional (skill_id) {
    return this.service.isProficiencyOptional(skill_id);
  }

  isProficiencyCheckboxVisible (skill_id) {
    if (this.proficiencies.is_proficient[skill_id]) {
      return true;
    }

    return this.isProficiencyOptional(skill_id);
  }
}
