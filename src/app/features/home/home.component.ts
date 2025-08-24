import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { ProfileService } from '../../core/services/profile/profile.service';
import { Profile } from '../../core/models/profile/profile.model';
import {SafeHtmlPipe} from '../../shared/pipes/safe-html.pipe';

interface Section {
  id: string;
  title: string;
  description: string;
  link: string;
  buttonText: string;
  visible: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CardModule, SafeHtmlPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  profile!: Profile;
  welcomeMessage = 'Welcome!';
  welcomeMessageChars: string[] = [];

  role: string = 'guest-view';
  sections: Section[] = [];

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.welcomeMessageChars = this.welcomeMessage.split('');

    // Determine role from path
    this.route.pathFromRoot.forEach(route =>
      route.url.subscribe(segments => {
        const firstSegment = segments[0]?.path.toLowerCase();
        if (firstSegment?.includes('recruiter')) this.role = 'recruiter-view';
        else if (firstSegment?.includes('developer')) this.role = 'developer-view';
        else if (firstSegment?.includes('random')) this.role = 'random-view';
        else this.role = 'guest-view';
      })
    );

    this.setupSections();

    this.profileService.getProfile().subscribe({
      next: (data) => {
        if (Array.isArray(data) && data.length > 0) this.profile = data[0];
      },
      error: (err) => console.error('Error loading profile', err)
    });
  }

  setupSections(): void {
    const allSections: Section[] = [
      {
        id: 'about',
        title: 'About Me',
        description: 'Learn more about my journey, passions, and what drives me to code and create meaningful software.',
        link: 'about',
        buttonText: 'Read More',
        visible: true
      },
      {
        id: 'projects',
        title: 'Projects',
        description: 'See real-world projects I’ve built, including web apps, APIs, and personal experiments.',
        link: 'projects',
        buttonText: 'View Projects',
        visible: true
      },
      {
        id: 'resume',
        title: 'Resume',
        description: 'Explore the tools and technologies I use — from Python and Django to frontend frameworks ' +
          '— and view my resume for a quick overview of my education, experience, and skills.',
        link: 'resume',
        buttonText: 'View Resume',
        visible: true
      },
      {
        id: 'contact',
        title: 'Contact',
        description: 'Have an opportunity, feedback, or just want to say hi? Let’s connect!',
        link: 'contact',
        buttonText: 'Get in Touch',
        visible: true
      }
    ];

    switch (this.role) {
      case 'recruiter-view':
        this.sections = allSections;
        break;
      case 'developer-view':
        this.sections = allSections.map(s => ({ ...s, visible: s.id !== 'contact' }));
        break;
      case 'guest-view':
        this.sections = allSections.map(s => ({ ...s, visible: s.id === 'about' }));
        break;
      case 'random-view':
        this.sections = allSections.map(s => ({ ...s, visible: s.id === 'projects' }));
        break;
      default:
        this.sections = allSections.map(s => ({ ...s, visible: s.id === 'about' }));
    }

    this.sections = this.sections.filter(s => s.visible);
  }

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
