import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AppService } from '../app.service';

@Component({
    selector: 'help',
    templateUrl: '/partials/common/help',
    directives: [ROUTER_DIRECTIVES]
})

export class HelpComponent {
  @Input() header: string;
  @Input() body: string;
  @Input() text: string;

  private modal;

  constructor(private app_service: AppService) { }

  onClick () {
    this.app_service.modals.help = {
      header: this.header,
      body: this.body
    }
  }
}
