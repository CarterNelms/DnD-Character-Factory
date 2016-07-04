import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { ClassesService } from './classes.service';
import { CharacterCreateService } from '../create.service';
 
@Component({
  selector: 'class-choose',
  templateUrl: '/partials/characters/classes/choose',
  directives: [ROUTER_DIRECTIVES],
  providers: [ClassesService]
})

export class ClassChooseComponent {
  public class;
  public classes;

  constructor(private service: ClassesService, private character_create_service: CharacterCreateService) { }

  ngOnInit() {
    this.class = {};
    this.classes = [];

    this.service.getClasses(classes => {
      this.classes = classes;

      this.setRandomClass();
    });
  }

  setRandomClass () {
    this.class = this.classes[Math.floor(this.classes.length * Math.random())];
  }
}
