import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../core/services/profile/profile.service';
import { Profile } from '../../core/models/profile/profile.model';

@Component({
  selector: 'app-home',
  imports: [CardModule, ButtonModule, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {

  currentYear = new Date().getFullYear();
  profile!: Profile; // holds the fetched profile

  welcomeMessage = 'Welcome!';
  welcomeMessageChars: string[] = [];

  sections = [
    {
      title: 'About Me',
      description: 'Learn more about my journey, passions, and what drives me to code and create meaningful software.',
      link: '/about',
      buttonText: 'Read More'
    },
    {
      title: 'Skills',
      description: 'Explore the tools, languages, and frameworks I use — from Python and Django to frontend technologies.',
      link: '/skills',
      buttonText: 'View Skills'
    },
    {
      title: 'Projects',
      description: 'See real-world projects I’ve built, including web apps, APIs, and personal experiments.',
      link: '/projects',
      buttonText: 'View Projects'
    },
    {
      title: 'Resume',
      description: 'Download or view my resume to get a quick overview of my education, experience, and skills.',
      link: '/resume',
      buttonText: 'View Resume'
    },
    {
      title: 'Contact',
      description: 'Have an opportunity, feedback, or just want to say hi? Let’s connect!',
      link: '/contact',
      buttonText: 'Get in Touch'
    }
  ];

  constructor(private profileService: ProfileService) {}

ngOnInit(): void {

  this.welcomeMessageChars = this.welcomeMessage.split('');

  this.profileService.getProfile().subscribe({
    next: (data) => {
      if (Array.isArray(data) && data.length > 0) {
        this.profile = data[0];  // Access the first profile in the list
      } else {
        console.warn('No profile data found.');
      }
    },
    error: (err) => console.error('Error loading profile', err)
  });
}

}
