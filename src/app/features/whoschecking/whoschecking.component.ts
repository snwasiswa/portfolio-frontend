import { Component, ViewEncapsulation, Renderer2 } from '@angular/core';
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
  backgroundGradient = 'linear-gradient(135deg, #0a0a0a, #1a1a1a)'; // Default dark fade

  // The animation class for the title - will be set randomly on init
  titleAnimationClass = '';

  constructor(private router: Router, private renderer: Renderer2) {}

  users = [
    { name: 'Recruiter', initial: 'R', color: '#E63946', path: '/recruiter-view' },
    { name: 'Developer', initial: 'D', color: '#F4A261', path: '/developer-view' },
    { name: 'Random', initial: 'X', color: '#2A9D8F', path: '/random-view' },
    { name: 'Guest', initial: 'G', color: '#264653', path: '/guest-view' }
  ];

  ngOnInit() {
    this.setRandomTitleAnimation();
    this.playIntroAudio();
  }

  setRandomTitleAnimation() {
    const animations = ['drop-from-above', 'slide-from-left', 'slide-from-right'];
    const randomIndex = Math.floor(Math.random() * animations.length);
    this.titleAnimationClass = animations[randomIndex];
  }

  playIntroAudio() {
    const audio = document.getElementById('intro-audio') as HTMLAudioElement | null;
    if (!audio) {
      console.warn('Intro audio element not found');
      return;
    }

    if ((audio as any).isPlaying) {
      return;
    }

    audio.play().then(() => {
      (audio as any).isPlaying = true;
    }).catch(() => {
      const playAudioOnce = () => {
        audio.play().then(() => {
          (audio as any).isPlaying = true;
        }).catch(err => console.warn('Audio play blocked:', err));
        window.removeEventListener('click', playAudioOnce);
        window.removeEventListener('keydown', playAudioOnce);
      };
      window.addEventListener('click', playAudioOnce);
      window.addEventListener('keydown', playAudioOnce);
    });
  }

  selectProfile(user: any, event?: MouseEvent | KeyboardEvent) {
    if (event && event.target instanceof HTMLElement) {
      const target = event.target.closest('.avatar');
      if (target instanceof HTMLElement) {
        this.createRipple(target, event);
      }
    }

    const gradientMap: Record<string, string> = {
      'Recruiter': 'linear-gradient(135deg, #0a0a0a, #0a0a0a, #E63946, #0a0a0a)',
      'Developer': 'linear-gradient(135deg, #0a0a0a, #0a0a0a, #F4A261, #0a0a0a)',
      'Random': 'linear-gradient(135deg, #0a0a0a, #0a0a0a, #2A9D8F, #0a0a0a)',
      'Guest': 'linear-gradient(135deg, #0a0a0a, #0a0a0a, #264653, #0a0a0a)'
    };

    this.backgroundGradient = gradientMap[user.name] || 'linear-gradient(135deg, #0a0a0a, #1a1a1a)';

    setTimeout(() => {
      this.router.navigate([user.path]);
    }, 600);
  }

  onKeyDown(event: KeyboardEvent, user: any) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectProfile(user, event);
    }
  }

  createRipple(element: HTMLElement, event: MouseEvent | KeyboardEvent) {
    const ripple = this.renderer.createElement('span');
    this.renderer.addClass(ripple, 'ripple');

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    let x = size / 2;
    let y = size / 2;

    if (event instanceof MouseEvent) {
      x = event.clientX - rect.left - size / 2;
      y = event.clientY - rect.top - size / 2;
    }

    this.renderer.setStyle(ripple, 'width', `${size}px`);
    this.renderer.setStyle(ripple, 'height', `${size}px`);
    this.renderer.setStyle(ripple, 'top', `${y}px`);
    this.renderer.setStyle(ripple, 'left', `${x}px`);

    this.renderer.appendChild(element, ripple);

    setTimeout(() => {
      this.renderer.removeChild(element, ripple);
    }, 600);
  }
}
