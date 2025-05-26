import { Component, HostListener } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PreferencesComponent } from '../preferences/preferences.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule, ToolbarModule, ButtonModule, SidebarModule, PreferencesComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuItems: MenuItem[] = [];
  activeSection: string = 'home'; // Initialize with the default section
  sidebarVisible = false;

  ngOnInit() {
    this.menuItems = [
      { separator: true },
      { label: 'Home', icon: 'pi pi-home', command: () => this.scrollTo('home') },
      { separator: true },
      { label: 'About', icon: 'pi pi-user', command: () => this.scrollTo('about') },
      { label: 'Projects', icon: 'pi pi-briefcase', command: () => this.scrollTo('projects') },
      { separator: true },
      { label: 'Skills', icon: 'pi pi-book', command: () => this.scrollTo('skills') },
      { separator: true },
      { label: 'Resume', icon: 'pi pi-briefcase', command: () => this.scrollTo('resume') },
      { separator: true },
      { label: 'Contact', icon: 'pi pi-envelope', command: () => this.scrollTo('contact') },
      { separator: true },
    ];
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    this.sidebarVisible = false; // Close the sidebar after selection (for mobile)
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'];
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

    // Add 'scrolled' class to both navbar and sidebar when scrolled
    if (window.scrollY > 50) {
      document.querySelector('.sticky-header')?.classList.add('scrolled');
      document.querySelector('.p-sidebar')?.classList.add('scrolled');
    } else {
      document.querySelector('.sticky-header')?.classList.remove('scrolled');
      document.querySelector('.p-sidebar')?.classList.remove('scrolled');
    }
  }
}
