import { Routes } from '@angular/router';

import { LogoComponent } from './features/logo/logo.component';
import { WhoscheckingComponent } from './features/whoschecking/whoschecking.component';
import { UniversalViewComponent } from './features/universal-view/universal-view.component';

import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ResumeComponent } from './features/resume/resume.component';
import { ContactComponent } from './features/contact/contact.component';

export const routes: Routes = [
  { path: '', component: LogoComponent },
  { path: 'who', component: WhoscheckingComponent },

  // Universal dynamic view routes
  { path: 'recruiter-view', component: UniversalViewComponent },
  { path: 'developer-view', component: UniversalViewComponent },
  { path: 'guest-view', component: UniversalViewComponent },
  { path: 'random-view', component: UniversalViewComponent },

  // Individual routes (if needed elsewhere)
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'contact', component: ContactComponent },

  // Catch-all fallback
  { path: '**', redirectTo: '' }
];
