import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { CheckboxComponent } from '../../common/checkbox.component';

import { AbilitiesService } from '../abilities/abilities.service';
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
  public abilities;
  public proficiencies;
  public scores;
  public skills;

  constructor(private service: SkillsService, private abilities_service: AbilitiesService) { }

  ngOnInit() {
    this.abilities = this.abilities_service.abilities;
    this.proficiencies = this.service.proficiencies;
    this.scores = this.abilities_service.scores;
    this.skills = {};

    this.service.getSkills(skills => {
      let s = {},
      is_p = {};

      skills.forEach(skill => {
        s[skill._id] = skill;
        is_p[skill._id] = false;
      });

      this.skills = s;
      this.proficiencies.is_proficient = is_p;
      this.service.determineAllAllowedProficiencies();
    });
  }

  getModifier (skill_id) {
    let ability_modifier = this.abilities_service.getModifier(this.skills[skill_id].ability_id);

    if (ability_modifier === null) {
      return null;
    }

    return ability_modifier + (this.isProficient(skill_id) ? 2 : 0);
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
