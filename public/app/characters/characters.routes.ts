import { provideRouter, RouterConfig }          from '@angular/router';

import { CharacterCreateComponent }             from './create.component';

export const CharactersRoutes: RouterConfig = [
  { path: 'characters/create', component: CharacterCreateComponent }
];
