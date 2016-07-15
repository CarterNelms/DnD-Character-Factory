import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'text-dropdown',
    templateUrl: '/partials/common/text-dropdown',
    directives: [ROUTER_DIRECTIVES]
})

export class TextDropdownComponent {
  private _value: any;

  @Input() disabled: boolean;
  @Input() display: string = "";
  @Input() id: string;
  @Input() is_randomizable: boolean = false;
  @Input() menu_display: string = "";
  @Input() name: string;
  @Input() options: any[];
  @Input() value: any;

  @Output() valueChange = new EventEmitter();

  constructor() { }

  get text () {
    return this.getDisplay(this.value);
  }

  set text (txt) {
    if (this.display.length === 0) {
      this.value = txt;
      return;
    }

    if (this.value == null) {
      return;
    }

    let keys = this.display.split('.'),
    tmp = this.value,
    last_index = keys.length - 1;

    _.each(keys, (key, i) => {
      if (i === last_index && tmp[key] !== undefined) {
        tmp[key] = txt;
        return false;
      }

      tmp = tmp[key];

      if (tmp === undefined) {
        return false;
      }
    });
  }

  get value () {
    return this._value;
  }

  set value (val) {
    this._value = val;
    this.valueChange.emit(this._value);
  }

  setRandomValue () {
    let old_value = this.value,
    new_value;

    do {
      new_value = _.sample(this.options);
    } while (old_value === new_value);

    this.value = new_value;
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

  getMenuDisplay (option) {
    let menu_display = this.menu_display;

    if (menu_display.length !== 0) {
      if (option[menu_display]) {
        return option[menu_display];
      }
    }

    return this.getDisplay(option);
  }

  onClick ($event, option) {
    if (this.value === option) {
      return;
    }
    this.value = option;
  }
}
