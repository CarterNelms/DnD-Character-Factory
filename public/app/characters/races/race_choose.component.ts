import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AbilitiesService } from '../abilities/abilities.service';
import { RacesService } from './races.service';
import { SkillsService } from '../skills/skills.service';
 
@Component({
  selector: 'race-choose',
  templateUrl: '/partials/characters/races/choose',
  directives: [ROUTER_DIRECTIVES],
  providers: [RacesService]
})

export class RaceChooseComponent {
  public race;
  public races;
  public subrace;

  constructor(private service: RacesService, private abilities_service: AbilitiesService, private skills_service: SkillsService) { }

  ngOnInit() {
    this.race = {};
    this.races = [];

    this.service.getRaces(races => {
      this.races = races;

      this.setRandomRace();
    });
  }

  setRandomRace () {
    this.setRace(this.races[Math.floor(this.races.length * Math.random())]);
  }

  setRandomSubrace () {
    this.setSubrace(this.hasSubraces() ? this.race.subraces[Math.floor(this.race.subraces.length * Math.random())] : {});
  }

  setRace (race) {
    this.race = race;
    this.abilities_service.setBonusesFromTraits('race', this.race.traits);
    this.skills_service.setAllowedProficienciesFromTraits('race', this.race.traits, false);
    this.setRandomSubrace();
  }

  setSubrace (subrace) {
    this.subrace = subrace;
    this.abilities_service.setBonusesFromTraits('subrace', this.subrace.traits);
    this.skills_service.setAllowedProficienciesFromTraits('subrace', this.subrace.traits);
  }

  hasSubraces () {
    if (!this.race) {
      return false;
    }

    if (!Array.isArray(this.race.subraces)) {
      return false;
    }

    return this.race.subraces.length !== 0;
  }
}
