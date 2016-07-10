import { provideRouter, RouterConfig } from '@angular/router';

import { CheckboxComponent } from './checkbox.component';
import { HelpComponent } from './help.component';

export const CommonRoutes: RouterConfig = [
  { path: 'common/help', component: HelpComponent }
];

export const CommonRoutes: RouterConfig = [
  { path: 'common/checkbox', component: CheckboxComponent }
];
