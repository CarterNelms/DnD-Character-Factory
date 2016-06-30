import { Injectable } from '@angular/core';

@Injectable()
export class AppService{
  modals;

  constructor () {
    this.modals = {
      help: {
        header: '',
        body: ''
      }
    }
  }
}
