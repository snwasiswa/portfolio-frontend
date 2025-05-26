import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';


@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule,  ThemeSwitcherComponent,],
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent {
  themes = [
    { label: 'Light', value: 'lara-light-blue' },
    { label: 'Dark', value: 'lara-dark-blue' },
    { label: 'Bootstrap', value: 'bootstrap4-light-blue' },
    { label: 'Material', value: 'md-light-indigo' }
  ];

  fontSizes = [
    { label: 'Small', value: '12px' },
    { label: 'Default', value: '14px' },
    { label: 'Large', value: '16px' },
    { label: 'Extra Large', value: '18px' }
  ];

  selectedTheme = 'lara-light-blue';
  selectedFontSize = '14px';

  ngOnInit() {
    this.applyTheme(this.selectedTheme);
    this.applyFontSize(this.selectedFontSize);
  }

  onThemeChange(theme: string) {
    this.applyTheme(theme);
  }

  onFontSizeChange(size: string) {
    this.applyFontSize(size);
  }

  applyTheme(theme: string) {
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `assets/themes/${theme}/theme.css`;
    }
  }

  applyFontSize(size: string) {
    document.documentElement.style.setProperty('--font-size', size);
  }
}
