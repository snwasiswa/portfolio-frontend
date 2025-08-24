import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../core/services/projects/projects.service';
import { Project } from '../../core/models/projects/project.model';
import {Button} from 'primeng/button';
import {SafeHtmlPipe} from '../../shared/pipes/safe-html.pipe';
import {Profile} from '../../core/models/profile/profile.model';
import {ProfileService} from '../../core/services/profile/profile.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, Button, SafeHtmlPipe],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  @ViewChild('academicScrollContainer', { static: true }) academicScroll!: ElementRef<HTMLDivElement>;
  @ViewChild('sideScrollContainer', { static: true }) sideScroll!: ElementRef<HTMLDivElement>;

  academicProjects: Project[] = [];
  sideProjects: Project[] = [];

  academicCurrentIndex = 0;
  sideCurrentIndex = 0;

  private scrollInterval: any;
  private hovered = false;

  profile!: Profile; // holds the fetched profile

  constructor(private projectsService: ProjectsService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loadProjects();
    this.startAutoScroll();
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

  ngOnDestroy(): void {
    this.clearScrollInterval();
  }

  loadProjects(): void {
    this.projectsService.getProjects().subscribe((projects) => {
      this.academicProjects = projects.filter(p => !p.is_side_project);
      this.sideProjects = projects.filter(p => p.is_side_project);
    });
  }

  openLink(url?: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  scroll(container: ElementRef<HTMLDivElement>, amount: number, type: 'academic' | 'side'): void {
    container.nativeElement.scrollBy({ left: amount, behavior: 'smooth' });

    const dotCount = this.getDotCount(type === 'academic' ? this.academicProjects : this.sideProjects).length;
    if (type === 'academic') {
      this.academicCurrentIndex = (this.academicCurrentIndex + (amount > 0 ? 1 : -1) + dotCount) % dotCount;
    } else {
      this.sideCurrentIndex = (this.sideCurrentIndex + (amount > 0 ? 1 : -1) + dotCount) % dotCount;
    }
  }

  getDotCount(projects: Project[]): any[] {
    return new Array(Math.ceil(projects.length / 3));
  }

  isDotActive(index: number, type: 'academic' | 'side'): boolean {
    return type === 'academic' ? index === this.academicCurrentIndex : index === this.sideCurrentIndex;
  }

  startAutoScroll(): void {
    this.scrollInterval = setInterval(() => {
      if (!this.hovered) {
        this.scroll(this.academicScroll, 300, 'academic');
        this.scroll(this.sideScroll, 300, 'side');
      }
    }, 3000);
  }

  clearScrollInterval(): void {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  }

  onHover(isHovering: boolean): void {
    this.hovered = isHovering;
  }
}
