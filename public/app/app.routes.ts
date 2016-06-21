import { provideRouter, RouterConfig }          from 'angular2/router';

import { HomeComponent }                        from './home.component';
import { CharacterCreateComponent }             from './characters/create.component';

export const routes: RouterConfig = [
  { path: '/home', component: HomeComponent, useAsDefault: true },
  { path: '/characters/create', component: CharacterCreateComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];