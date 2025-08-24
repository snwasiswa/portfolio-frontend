import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../core/services/profile/profile.service';
import { MyContact } from '../../core/models/mycontact/mycontact.model';
import { Profile } from '../../core/models/profile/profile.model';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-about',
  imports: [CardModule, ButtonModule, RouterModule, CommonModule, SafeHtmlPipe, ImageModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  profile!: Profile; // holds the fetched profile
  constructor(private profileService: ProfileService) { }


  profile_contacts: MyContact[] = [];


  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.profile = data[0];  // Access the first profile in the list
          this.profile_contacts = this.profile.all_links ?? [];
        } else {
          console.warn('No profile data found.');
        }
      },
      error: (err) => console.error('Error loading profile', err)
    });
  }

  scrollToSection(sectionId: string, event?: MouseEvent) {
    if (event) {
      event.preventDefault(); // Prevents jumping to top
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
