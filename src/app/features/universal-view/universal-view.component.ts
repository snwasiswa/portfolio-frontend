import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ResumeComponent } from '../resume/resume.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SectionWrapperComponent } from '../../shared/components/section-wrapper/section-wrapper.component';

type AnimationType = 'fadeSlideIn' | 'zoomIn' | 'slideLeft' | 'rotateIn';

interface SectionConfig {
  id: string;
  component: string;
  visible: boolean;
  animation: AnimationType;
}

@Component({
  selector: 'app-universal-view',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterModule,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    ResumeComponent,
    ContactComponent,
    FooterComponent,
    SectionWrapperComponent,
  ],
  templateUrl: './universal-view.component.html',
  styleUrls: ['./universal-view.component.scss']
})
export class UniversalViewComponent implements OnInit {
  role: string = 'guest-view';

  sectionConfig: SectionConfig[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe(segments => {
      this.role = segments[0]?.path.toLowerCase() || 'guest-view';
      this.setupSections();
    });
  }

  setupSections() {
    // Base sections with default animations
    const allSections: SectionConfig[] = [
      { id: 'home', component: 'home', visible: true, animation: 'rotateIn' },
      { id: 'about', component: 'about', visible: true, animation: 'rotateIn' },
      { id: 'projects', component: 'projects', visible: true, animation: 'rotateIn' },
      { id: 'resume', component: 'resume', visible: true, animation: 'rotateIn' },
      { id: 'contact', component: 'contact', visible: true, animation: 'rotateIn' }
    ];

    switch (this.role) {
      case 'recruiter-view':
        this.sectionConfig = allSections;
        break;

      case 'developer-view':
        this.sectionConfig = allSections.map(section => ({
          ...section,
          visible: section.id !== 'contact',  // Hide contact for developer
          animation: section.id === 'projects' ? 'rotateIn' : section.animation
        }));
        break;

      case 'guest-view':
        this.sectionConfig = allSections.map(section => ({
          ...section,
          visible: ['home', 'about'].includes(section.id),
          animation: section.id === 'home' ? 'rotateIn' : section.animation // simpler animations
        }));
        break;

      case 'random-view':
        this.sectionConfig = allSections.map(section => ({
          ...section,
          visible: section.id === 'projects',
          animation: 'rotateIn'
        }));
        break;

      default:
        this.sectionConfig = allSections.map(section => ({
          ...section,
          visible: section.id === 'home',
          animation: 'rotateIn'
        }));
    }
  }
}
