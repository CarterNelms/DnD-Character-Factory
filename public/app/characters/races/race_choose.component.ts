import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { RacesService } from './races.service';
import { CharacterCreateService } from '../create.service';
 
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

  constructor(private service: RacesService, private character_create_service: CharacterCreateService) { }

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
    this.character_create_service.setRaceAbilityBonuses(this.race);
    this.setRandomSubrace();
  }

  setSubrace (subrace) {
    this.subrace = subrace;
    this.character_create_service.setSubraceAbilityBonuses(this.subrace);
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
