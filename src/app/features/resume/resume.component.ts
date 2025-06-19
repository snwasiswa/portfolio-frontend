import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../core/services/profile/profile.service';
import { Profile } from '../../core/models/profile/profile.model';
import { Education } from '../../core/models/education/education.model';
import { Skill } from '../../core/models/skill/skill.model';
import { Leadership } from '../../core/models/leadership/leadership.model';
import { Project } from '../../core/models/projects/project.model';
import { Experience } from '../../core/models/experience/experience.model';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {
  activeTab = '';
  isDialogVisible = false;

  profile!: Profile;
  educations: Education[] = [];
  experiences: Experience[] = [];
  skills: Skill[] = [];
  groupedSkills: { category: string; skills: Skill[] }[] = [];
  projects: Project[] = [];
  leaderships: Leadership[] = [];

  categoryState: { [key: number]: boolean } = {};

  extracurricular = [
    { title: 'Hackathon Winner', description: 'Won 1st place in regional hackathon.' },
    { title: 'Tech Club', description: 'Led workshops on web development and UI design.' }
  ];

  tabs = [
    { label: 'Education', icon: 'pi pi-book' },
    { label: 'Experience', icon: 'pi pi-briefcase' },
    { label: 'Projects', icon: 'pi pi-folder' },
    { label: 'Skills', icon: 'pi pi-star' },
    { label: 'Extracurricular', icon: 'pi pi-users' }
  ];

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
        } else {
          console.warn('No profile data found.');
        }
      },
      error: (err) => console.error('Error loading profile', err)
    });
  }

  // Choose which categories are full-width (can be dynamic)
  isFullWidthCategory(category: string | undefined): boolean {
    const fullWidthCategories = ['Soft Skills', 'Languages', 'Other']; // Customize as needed
    return fullWidthCategories.includes(category ?? '');
  }


  private groupSkillsByCategory(): void {
    const categoryMap: { [key: string]: Skill[] } = {};

    for (const skill of this.skills) {
      const category = skill.category || 'Uncategorized'; // fallback for undefined
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


  toggleCategory(index: number): void {
    this.categoryState[index] = !this.categoryState[index];
  }

  isCategoryOpen(index: number): boolean {
    return this.categoryState[index] ?? true; // Open by default
  }

  openTabDialog(tabLabel: string) {
    this.activeTab = tabLabel;
    this.isDialogVisible = true;
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
}
