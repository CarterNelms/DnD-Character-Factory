import { Component }                from '@angular/core';
import { ROUTER_DIRECTIVES }        from '@angular/router';
 
import { CharacterCreateComponent } from './characters/create.component';

import { AppService } from './app.service';

@Component({
    selector: 'app',
    templateUrl: '/partials/index',
    providers: [AppService],
    directives: [ROUTER_DIRECTIVES, CharacterCreateComponent]
})

export class AppComponent {
  private modals;

  constructor(private service: AppService) { }

  ngOnInit () {
    this.modals = this.service.modals;
  }
}
