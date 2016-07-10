import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'checkbox',
    templateUrl: '/partials/common/checkbox',
    directives: [ROUTER_DIRECTIVES]
})

export class CheckboxComponent {
  @Input() id: string;
  @Input() checked: boolean;
  @Output() changed = new EventEmitter();
  @Input() disabled: boolean;

  constructor() { }

  change ($event) {
    this.changed.emit($event);
  }
}
