import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MenubarModule,
    ToolbarModule,
    ButtonModule,
    SidebarModule,
    DropdownModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menuItems: MenuItem[] = [];
  activeSection: string = 'home';
  sidebarVisible = false;

  role: string = 'guest-view';
  selectedRole: any;

  roleOptions = [
    { label: 'Recruiter', value: 'recruiter-view', icon: 'pi pi-user-plus' },
    { label: 'Developer', value: 'developer-view', icon: 'pi pi-code' },
    { label: 'Guest', value: 'guest-view', icon: 'pi pi-user' },
    { label: 'Random', value: 'random-view', icon: 'pi pi-globe' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.detectRole();
    this.selectedRole = this.roleOptions.find(r => r.value === this.role);
    this.buildMenuForRole();

    // Sync role after navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.detectRole();
        this.selectedRole = this.role;
        this.buildMenuForRole();
      });
  }

  private detectRole() {
    const currentUrl = this.router.url;
    const match = currentUrl.match(/\/([a-zA-Z\-]+)\b/);
    this.role = match?.[1] || 'guest-view';
    this.selectedRole = this.role;
  }

  onSwitchRole(event: any) {
    const selectedRole = event.value?.value;
    if (selectedRole && selectedRole !== this.role) {
      this.router.navigate([`/${selectedRole}`]);
    }
  }

  private buildMenuForRole() {
    const allItems: MenuItem[] = [
      { separator: true },
      { label: 'Home', icon: 'pi pi-home', command: () => this.scrollTo('home') },
      { separator: true },
      { label: 'About', icon: 'pi pi-user', command: () => this.scrollTo('about') },
      { separator: true },
      { label: 'Projects', icon: 'pi pi-briefcase', command: () => this.scrollTo('projects') },
      { separator: true },
      { label: 'Resume', icon: 'pi pi-file', command: () => this.scrollTo('resume') },
      { separator: true },
      { label: 'Contact', icon: 'pi pi-envelope', command: () => this.scrollTo('contact') },
      { separator: true }
    ];

    switch (this.role) {
      case 'recruiter-view':
        this.menuItems = allItems;
        break;
      case 'developer-view':
        this.menuItems = allItems.filter(item =>
          ['Home', 'About', 'Projects', 'Resume'].includes(item.label || '')
        );
        break;
      case 'guest-view':
        this.menuItems = allItems.filter(item =>
          ['Home', 'About'].includes(item.label || '')
        );
        break;
      case 'random-view':
        this.menuItems = allItems.filter(item =>
          ['Projects'].includes(item.label || '')
        );
        break;
      default:
        this.menuItems = allItems.filter(item =>
          ['Home'].includes(item.label || '')
        );
    }
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    this.sidebarVisible = false;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const sectionIds = ['home', 'about', 'projects', 'resume', 'contact'];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          this.activeSection = id;
          break;
        }
      }
    }

    const header = document.querySelector('.sticky-header');
    const sidebar = document.querySelector('.p-sidebar');

    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
      sidebar?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
      sidebar?.classList.remove('scrolled');
    }
  }
}
