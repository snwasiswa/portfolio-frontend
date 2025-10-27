import { Component, ElementRef, ViewChild, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../core/services/projects/projects.service';
import { Project } from '../../core/models/projects/project.model';
import { ButtonModule } from 'primeng/button';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';
import { Profile } from '../../core/models/profile/profile.model';
import { ProfileService } from '../../core/services/profile/profile.service';
import { DialogModule } from 'primeng/dialog';
import { Portfolio } from '../../core/models/portfolio/portfolio.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ButtonModule, SafeHtmlPipe, DialogModule],
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
  private scrollInterval: ReturnType<typeof setInterval> | null = null;
  private hovered = false;

  profile?: Profile;

  displayCarousel = false;
  selectedProject: (Portfolio & { currentSlide?: number }) | null = null;

  // Swipe support
  private touchStartX = 0;
  private touchEndX = 0;

  constructor(private projectsService: ProjectsService, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProjects();
    this.startAutoScroll();

    this.profileService.getProfile().subscribe({
      next: (data) => {
        if (Array.isArray(data) && data.length > 0) this.profile = data[0];
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
      console.log(projects);
    });
  }

  openLink(url?: string): void {
    if (url) window.open(url, '_blank');
  }

  scroll(container: ElementRef<HTMLDivElement>, amount: number, type: 'academic' | 'side'): void {
    container.nativeElement.scrollBy({ left: amount, behavior: 'smooth' });
    const projects = type === 'academic' ? this.academicProjects : this.sideProjects;
    const dotCount = this.getDotCount(projects).length;

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
      this.scrollInterval = null;
    }
  }

  onHover(isHovering: boolean): void {
    this.hovered = isHovering;
  }

  // ================= Carousel =================
  openCarousel(project: Portfolio): void {
    this.selectedProject = { ...project, currentSlide: 0 };
    this.displayCarousel = true;
  }

  closeCarousel(): void {
    this.displayCarousel = false;
    this.selectedProject = null;
  }

  nextSlide(): void {
    if (!this.selectedProject?.images?.length) return;
    this.selectedProject.currentSlide = ((this.selectedProject.currentSlide ?? 0) + 1) % this.selectedProject.images.length;
  }

  prevSlide(): void {
    if (!this.selectedProject?.images?.length) return;
    const len = this.selectedProject.images.length;
    this.selectedProject.currentSlide = ((this.selectedProject.currentSlide ?? 0) - 1 + len) % len;
  }

  // Keyboard navigation
  @HostListener('document:keydown.arrowRight', ['$event'])
  handleArrowRight(event: KeyboardEvent) {
    if (this.displayCarousel) this.nextSlide();
  }

  @HostListener('document:keydown.arrowLeft', ['$event'])
  handleArrowLeft(event: KeyboardEvent) {
    if (this.displayCarousel) this.prevSlide();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    if (this.displayCarousel) this.closeCarousel();
  }

  // Swipe support for mobile
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;

    if (this.touchEndX < this.touchStartX - 30) this.nextSlide();
    if (this.touchEndX > this.touchStartX + 30) this.prevSlide();
  }
}
