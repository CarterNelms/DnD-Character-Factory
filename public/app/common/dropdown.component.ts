import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'dropdown',
    templateUrl: '/partials/common/dropdown',
    directives: [ROUTER_DIRECTIVES]
})

export class DropdownComponent {
  @Input() disabled: boolean;
  @Input() display: string;
  @Input() id: string;
  @Input() name: string;
  @Input() options: any[];
  @Input() value: any;

  @Output() valueChange = new EventEmitter();

  constructor() {
    if (this.display == null) {
      this.display = "";   
    }
  }

  getDisplay (option) {
    let display = option;

    if (display == null) {
      return "";
    }

    if (this.display.length === 0) {
      return display;
    }

    let keys = this.display.split('.');

    _.each(keys, key => {
      if (!display[key]) {
        return false;
      }
      display = display[key];
    });

    return display;
  }

  onClick ($event, option) {
    if (this.value === option) {
      return;
    }
    this.value = option;
    this.valueChange.emit(option);
  }
}
