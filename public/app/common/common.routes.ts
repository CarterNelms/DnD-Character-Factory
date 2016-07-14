import { RouterConfig } from '@angular/router';

import { CheckboxComponent } from './checkbox.component';
import { DropdownComponent } from './dropdown.component';
import { HelpComponent } from './help.component';

export const CommonRoutes: RouterConfig = [
  { path: 'common/checkbox', component: CheckboxComponent },
  { path: 'common/dropdown', component: DropdownComponent },
  { path: 'common/help', component: HelpComponent }
];
