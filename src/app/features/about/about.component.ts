import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../core/services/profile/profile.service';
import { Profile } from '../../core/models/profile/profile.model';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-about',
  imports: [CardModule, ButtonModule, RouterModule, CommonModule, SafeHtmlPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

profile!: Profile; // holds the fetched profile
constructor(private profileService: ProfileService) {}


links = [
]


ngOnInit(): void {
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
