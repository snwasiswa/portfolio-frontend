import { Routes } from '@angular/router';

import { LogoComponent } from './features/logo/logo.component';
import { WhoscheckingComponent } from './features/whoschecking/whoschecking.component';
import { UniversalViewComponent } from './features/universal-view/universal-view.component';

export const routes: Routes = [
  { path: '', component: LogoComponent },
  { path: 'who', component: WhoscheckingComponent },

  // Recruiter View - one page
  { path: 'recruiter-view', component: UniversalViewComponent },

  // Developer View - one page
  { path: 'developer-view', component: UniversalViewComponent },

  // Guest View - one page
  { path: 'guest-view', component: UniversalViewComponent },

  // Random View - one page
  { path: 'random-view', component: UniversalViewComponent },

  // Fallback route
  { path: '**', redirectTo: '' }
];
