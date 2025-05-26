import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../core/services/projects/projects.service';
import { Project } from '../../core/models/projects/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
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

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.loadProjects();
    this.startAutoScroll();
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
