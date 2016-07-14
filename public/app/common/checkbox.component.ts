import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'checkbox',
    templateUrl: '/partials/common/checkbox',
    directives: [ROUTER_DIRECTIVES]
})

export class CheckboxComponent {
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() id: string;
  @Input() name: string;
  @Input() type: string;
  
  @Output() changed = new EventEmitter();

  constructor() {
    if (!this.type) {
      this.type = 'checkbox';
    }
  }

  change ($event) {
    this.changed.emit($event);
  }
}
