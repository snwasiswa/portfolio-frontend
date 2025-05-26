import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-section-wrapper',
  standalone: true,
  imports: [CommonModule],
  animations: [
    // Fade and slide in animation
    trigger('fadeSlideIn', [
      state('hidden', style({ opacity: 0, transform: 'translateY(30px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('700ms ease-out'))
    ]),

    // Zoom in animation
    trigger('zoomIn', [
      state('hidden', style({ opacity: 0, transform: 'scale(0.8)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('hidden => visible', animate('600ms ease-in'))
    ]),

    // Slide from left animation
    trigger('slideLeft', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-50px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', animate('600ms ease-out'))
    ]),

    // Rotate in animation
    trigger('rotateIn', [
      state('hidden', style({ opacity: 0, transform: 'rotate(-90deg)' })),
      state('visible', style({ opacity: 1, transform: 'rotate(0)' })),
      transition('hidden => visible', animate('700ms ease-in-out'))
    ])
  ],
  templateUrl: './section-wrapper.component.html',
  styleUrls: ['./section-wrapper.component.scss']
})
export class SectionWrapperComponent implements OnInit {
  @Input() triggerOnce = true;
  @Input() animation: 'fadeSlideIn' | 'zoomIn' | 'slideLeft' | 'rotateIn' = 'fadeSlideIn';
  visible = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visible = true;
          if (this.triggerOnce) {
            observer.unobserve(this.el.nativeElement);
          }
        } else if (!this.triggerOnce) {
          this.visible = false;
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(this.el.nativeElement);
  }
}
