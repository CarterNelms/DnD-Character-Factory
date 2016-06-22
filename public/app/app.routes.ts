import { provideRouter, RouterConfig }          from '@angular/router';

import { HomeComponent }                        from './home.component';
import { CharacterCreateComponent }             from './characters/create.component';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent, useAsDefault: true },
  { path: 'characters/create', component: CharacterCreateComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];