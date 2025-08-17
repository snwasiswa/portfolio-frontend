import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { ProfileService } from '../../core/services/profile/profile.service';
import { Profile } from '../../core/models/profile/profile.model';
import { Education } from '../../core/models/education/education.model';
import { Skill } from '../../core/models/skill/skill.model';
import { Leadership } from '../../core/models/leadership/leadership.model';
import { Project } from '../../core/models/projects/project.model';
import { Experience } from '../../core/models/experience/experience.model';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, ButtonModule, SafeHtmlPipe, ImageModule, FormsModule],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  animations: [
    trigger('collapseAnimation', [
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
          padding: '*',
          marginTop: '1rem'
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
          padding: '0 1rem',
          marginTop: '0rem'
        })
      ),
      transition('open <=> closed', animate('300ms ease-in-out'))
    ])
  ]
})
export class ResumeComponent {
  activeTab = '';
  isDialogVisible = false;
  isPasswordDialogVisible = false;
  password: string = '';
  correctPassword: string = '';

  profile!: Profile;
  educations: Education[] = [];
  experiences: Experience[] = [];
  skills: Skill[] = [];
  groupedSkills: { category: string; skills: Skill[] }[] = [];
  projects: Project[] = [];
  leaderships: Leadership[] = [];

  @ViewChildren('educationSection') educationSections!: QueryList<ElementRef>;
  @ViewChildren('experienceSection') experienceSections!: QueryList<ElementRef>;
  @ViewChildren('projectSection') projectSections!: QueryList<ElementRef>;
  @ViewChildren('leadershipSection') leadershipSections!: QueryList<ElementRef>;
  @ViewChildren('skillCategorySection') skillCategorySections!: QueryList<ElementRef>;

  openEducationIndex: number | null = null;
  openExperienceIndex: number | null = null;
  openProjectIndex: number | null = null;
  openLeadershipIndex: number | null = null;
  openSkillCategoryIndex: number | null = null;

  tabs: { label: string; icon: string }[] = [];

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.profile = data[0];
          this.educations = this.profile.all_educations ?? [];
          this.skills = this.profile.all_skills ?? [];
          this.leaderships = this.profile.all_leaderships ?? [];
          this.projects = this.profile.all_projects ?? [];
          this.experiences = this.profile.all_experiences ?? [];

          this.groupSkillsByCategory();

          // Build tabs dynamically
          this.tabs = [
            { label: 'Education', icon: 'pi pi-book' },
            ...(this.hasActiveExperiences ? [{ label: 'Experience', icon: 'pi pi-briefcase' }] : []),
            { label: 'Projects', icon: 'pi pi-folder' },
            { label: 'Skills', icon: 'pi pi-star' },
            { label: 'Extracurricular', icon: 'pi pi-users' }
          ];
        } else {
          console.warn('No profile data found.');
        }
      },
      error: (err) => console.error('Error loading profile', err)
    });
  }

  get hasActiveExperiences(): boolean {
    return this.experiences?.some(exp => exp.active) ?? false;
  }

  isFullWidthCategory(category: string | undefined): boolean {
    const fullWidthCategories = ['Soft Skills', 'Languages', 'Other'];
    return fullWidthCategories.includes(category ?? '');
  }

  toggleSection(index: number): void {
    const el = this.educationSections.toArray()[index]?.nativeElement;
    if (!el) return;

    const prevHeight = el.offsetHeight;
    this.openEducationIndex = this.openEducationIndex === index ? null : index;

    setTimeout(() => {
      const newHeight = el.offsetHeight;
      const heightDiff = newHeight - prevHeight;
      if (heightDiff !== 0) {
        window.scrollBy({ top: heightDiff, behavior: 'auto' });
      }
    }, 310);
  }

  toggleExperience(index: number): void {
    const el = this.experienceSections.toArray()[index]?.nativeElement;
    if (!el) return;

    const prevHeight = el.offsetHeight;
    this.openExperienceIndex = this.openExperienceIndex === index ? null : index;

    setTimeout(() => {
      const newHeight = el.offsetHeight;
      const heightDiff = newHeight - prevHeight;
      if (heightDiff !== 0) {
        window.scrollBy({ top: heightDiff, behavior: 'auto' });
      }
    }, 310);
  }

  toggleProject(index: number): void {
    const el = this.projectSections.toArray()[index]?.nativeElement;
    if (!el) return;

    const prevHeight = el.offsetHeight;
    this.openProjectIndex = this.openProjectIndex === index ? null : index;

    setTimeout(() => {
      const newHeight = el.offsetHeight;
      const heightDiff = newHeight - prevHeight;
      if (heightDiff !== 0) {
        window.scrollBy({ top: heightDiff, behavior: 'auto' });
      }
    }, 310);
  }

  toggleLeadership(index: number): void {
    const el = this.leadershipSections.toArray()[index]?.nativeElement;
    if (!el) return;

    const prevHeight = el.offsetHeight;
    this.openLeadershipIndex = this.openLeadershipIndex === index ? null : index;

    setTimeout(() => {
      const newHeight = el.offsetHeight;
      const heightDiff = newHeight - prevHeight;
      if (heightDiff !== 0) {
        window.scrollBy({ top: heightDiff, behavior: 'auto' });
      }
    }, 310);
  }

  toggleCategory(index: number): void {
    const el = this.skillCategorySections.toArray()[index]?.nativeElement;
    if (!el) return;

    const prevHeight = el.offsetHeight;
    this.openSkillCategoryIndex = this.openSkillCategoryIndex === index ? null : index;

    setTimeout(() => {
      const newHeight = el.offsetHeight;
      const heightDiff = newHeight - prevHeight;
      if (heightDiff !== 0) {
        window.scrollBy({ top: heightDiff, behavior: 'auto' });
      }
    }, 310);
  }

  isCategoryOpen(index: number): boolean {
    return this.openSkillCategoryIndex === index;
  }

  openTabDialog(tabLabel: string) {
    this.activeTab = tabLabel;
    this.isDialogVisible = true;

    this.openEducationIndex = null;
    this.openExperienceIndex = null;
    this.openProjectIndex = null;
    this.openLeadershipIndex = null;
    this.openSkillCategoryIndex = null;
  }

  closeDialog() {
    this.isDialogVisible = false;
  }

  getSkillPercentage(score: number): number {
    return (score / 5) * 100;
  }

  getSkillTooltip(score: number): string {
    if (score <= 2) return 'Beginner';
    if (score === 3) return 'Intermediate';
    if (score >= 4) return 'Advanced';
    return '';
  }

  getSkillLevelClass(score: number): string {
    if (score <= 2) return 'skill-beginner';
    if (score === 3) return 'skill-intermediate';
    if (score >= 4) return 'skill-advanced';
    return '';
  }

  private groupSkillsByCategory(): void {
    const categoryMap: { [key: string]: Skill[] } = {};

    for (const skill of this.skills) {
      const category = skill.category || 'Uncategorized';
      if (!categoryMap[category]) {
        categoryMap[category] = [];
      }
      categoryMap[category].push(skill);
    }

    this.groupedSkills = Object.entries(categoryMap).map(([category, skills]) => ({
      category,
      skills
    }));
  }

  openPasswordDialog(): void {
    this.isPasswordDialogVisible = true;
  }

  closePasswordDialog(): void {
    this.isPasswordDialogVisible = false;
  }

  validatePassword(): void {
    this.profileService.downloadResumeWithPassword(this.password).subscribe({
      next: (blob) => {
        this.isPasswordDialogVisible = false;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'My_Resume.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        alert('Incorrect password or resume download failed.');
        console.error('Download error:', err);
      }
    });
  }
}
