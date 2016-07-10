import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { ClassesService } from './classes.service';
import { SkillsService } from '../skills/skills.service';
 
@Component({
  selector: 'class-choose',
  templateUrl: '/partials/characters/classes/choose',
  directives: [ROUTER_DIRECTIVES],
  providers: [ClassesService]
})

export class ClassChooseComponent {
  public class;
  public classes;

  constructor(private service: ClassesService, private skills_service: SkillsService) { }

  ngOnInit() {
    this.class = {};
    this.classes = [];

    this.service.getClasses(classes => {
      this.classes = classes;

      this.setRandomClass();
    });
  }

  setClass (clss) {
    this.class = clss;
    this.skills_service.setAllowedProficienciesFromTraits('class', this.class.traits);
  }

  setRandomClass () {
    this.setClass(this.classes[Math.floor(this.classes.length * Math.random())]);
  }
}
