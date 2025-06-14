import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ResumeComponent } from '../resume/resume.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SectionWrapperComponent } from '../../shared/components/section-wrapper/section-wrapper.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule


@Component({
  selector: 'app-recruiter-view',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ResumeComponent,
    ContactComponent,
    BreadcrumbComponent,
    FooterComponent,
    SectionWrapperComponent,
    HttpClientModule,

  ],
  templateUrl: './recruiter-view.component.html',
  styleUrls: ['./recruiter-view.component.scss'],
})
export class RecruiterViewComponent {

}
