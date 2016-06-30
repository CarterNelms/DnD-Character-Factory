import { provideRouter, RouterConfig } from '@angular/router';

import { HelpComponent } from './help.component';

export const CommonRoutes: RouterConfig = [
  { path: 'common/help', component: HelpComponent }
];
