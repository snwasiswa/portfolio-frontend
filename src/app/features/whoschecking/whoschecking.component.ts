import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-whoschecking',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  templateUrl: './whoschecking.component.html',
  styleUrls: ['./whoschecking.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WhoscheckingComponent {
  backgroundGradient = 'linear-gradient(135deg, #000000, #111111)'; // Default dark fade

  constructor(private router: Router) {}

  users = [
    { name: 'Recruiter', initial: 'R', color: '#0072CE', path: '/recruiter-view' },
    { name: 'Developer', initial: 'D', color: '#FF6A13', path: '/developer-view' },
    { name: 'Random', initial: 'X', color: '#93328E', path: '/random-view' },
    { name: 'Guest', initial: 'G', color: '#00A651', path: '/guest-view' }
  ];

  selectProfile(user: any) {
  const gradientMap: Record<string, string> = {
    'Recruiter': 'linear-gradient(135deg, #000000, #000000, #0072CE, #000000)',
    'Developer': 'linear-gradient(135deg, #000000, #000000, #FF6A13, #000000)',
    'Random': 'linear-gradient(135deg, #000000, #000000, #93328E, #000000)',
    'Guest': 'linear-gradient(135deg, #000000, #000000, #00A651, #000000)'
  };

  this.backgroundGradient = gradientMap[user.name] || 'linear-gradient(135deg, #000000, #111111)';

    setTimeout(() => {
      this.router.navigate([user.path]);
    }, 600);
  }
}
