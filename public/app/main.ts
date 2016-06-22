import 'reflect-metadata';
// workaround for https://github.com/angular/angular/issues/6007
import { Zone } from 'zone.js';
window.zone = Zone;
 
import { bootstrap } from                       '@angular/platform-browser-dynamic';
import { AppComponent } from                    './app.component';
import { APP_ROUTER_PROVIDERS } from            './app.routes';

bootstrap(AppComponent, [ APP_ROUTER_PROVIDERS ] )
    .catch(err => console.error(err))
;
