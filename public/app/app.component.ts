import { Component }                from 'angular2/core';
import { ROUTER_DIRECTIVES }        from 'angular2/router';
 
@Component({
    selector: 'app',
    templateUrl: '/partials/index',
    directives: [ROUTER_DIRECTIVES]
})

export class AppComponent { }
