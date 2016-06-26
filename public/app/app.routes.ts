import { provideRouter, RouterConfig }          from '@angular/router';

import { CharactersRoutes }                     from './characters/characters.routes';
import { HomeRoutes }                           from './home.routes';

export const routes: RouterConfig = [
  ...CharactersRoutes,
  ...HomeRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];