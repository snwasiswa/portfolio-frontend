import { Routes } from '@angular/router';
import { LogoComponent } from './features/logo/logo.component';
import { WhoscheckingComponent } from './features/whoschecking/whoschecking.component';
import { RecruiterViewComponent } from './features/recruiter-view/recruiter-view.component';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ContactComponent } from './features/contact/contact.component';
import { ResumeComponent } from './features/resume/resume.component';

export const routes: Routes = [
  { path: '', component: LogoComponent },
  //{ path: '', redirectTo: 'who', pathMatch: 'full' } ,
  { path: 'who', component: WhoscheckingComponent },
  { path: 'recruiter-view', component: RecruiterViewComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'contact', component: ContactComponent },

];
