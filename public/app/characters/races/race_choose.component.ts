import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AbilitiesService } from '../abilities/abilities.service';
import { RacesService } from './races.service';
import { SkillsService } from '../skills/skills.service';
 
import { ObjToArrPipe } from '../../common/obj_to_arr.pipe';

@Component({
  selector: 'race-choose',
  templateUrl: '/partials/characters/races/choose',
  directives: [ROUTER_DIRECTIVES],
  providers: [RacesService],
  pipes: [ObjToArrPipe]
})

export class RaceChooseComponent {
  public race_id;
  public races;
  public subrace_id;

  constructor(private service: RacesService, private abilities_service: AbilitiesService, private skills_service: SkillsService) { }

  ngOnInit() {
    this.race_id = null;
    this.races = {};
    this.subrace_id = null;

    this.service.getRaces(races => {
      let races_obj = {};
      races.forEach(race => {
        let subraces = {};
        race.subraces.forEach(subrace => {
          subraces[subrace._id] = subrace;
        });
        race.subraces = subraces;
        races_obj[race._id] = race;
      });

      this.races = races_obj;

      this.setRandomRace();
    });
  }

  setRandomRace () {
    this.race = _.sample(this.races);
  }

  set race (race) {
    this.race_id = _.isEmpty(race) ? null : race._id;
    race = this.race;
    let traits = race.traits ? race.traits : [];
    this.abilities_service.setBonusesFromTraits('race', traits);
    this.skills_service.setAllowedProficienciesFromTraits('race', traits, false);
    this.setRandomSubrace();
  }

  get race () {
    if (!this.race_id) {
      return {};
    }

    return this.races[this.race_id];
  }

  setRandomSubrace () {
    this.subrace = _.sample(this.subraces);
  }

  set subrace (subrace) {
    this.subrace_id = _.isEmpty(subrace) ? null : subrace._id;
    subrace = this.subrace;
    let traits = subrace.traits ? subrace.traits : [];
    this.abilities_service.setBonusesFromTraits('subrace', traits);
    this.skills_service.setAllowedProficienciesFromTraits('subrace', traits);
  }

  get subraces () {
    if (!this.race_id) {
      return {};
    }

    return this.races[this.race_id].subraces;
  }

  get subrace () {
    if (!this.subrace_id) {
      return {};
    }

    return this.subraces[this.subrace_id];
  }

  hasSubraces () {
    return !_.isEmpty(this.subraces);
  }
}
