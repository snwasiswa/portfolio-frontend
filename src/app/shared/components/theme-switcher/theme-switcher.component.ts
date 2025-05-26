import { Component } from '@angular/core';
import { usePreset, updateSurfacePalette } from '@primeng/themes';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

import Aura from '@primeng/themes/aura';
import Material from '@primeng/themes/material';
import Lara from '@primeng/themes/lara';
import Nora from '@primeng/themes/nora';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarModule, DropdownModule, InputSwitchModule, ButtonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent {
  sidebarVisible = false;
  isDarkMode = false;
  fontSize = '16px';
  themePreset = 'Aura';
  selectedFontSize: string = 'Medium'; // Ensure this is a string
  selectedTheme: string = 'Aura'; // Ensure this is a string

  fontSizeMapping: Record<string, string> = {
    Small: '12px',
    Medium: '16px',
    Large: '20px',
    'X-Large': '24px',
    'XX-Large': '28px',
  };

  fontSizeOptions = [
    { label: 'Small', value: 'Small', icon: 'pi pi-minus' },
    { label: 'Medium', value: 'Medium', icon: 'pi pi-circle' },
    { label: 'Large', value: 'Large', icon: 'pi pi-plus' },
    { label: 'X-Large', value: 'X-Large', icon: 'pi pi-arrow-up' },
    { label: 'XX-Large', value: 'XX-Large', icon: 'pi pi-arrow-up-right' },
  ];

  themeOptions = [
    { label: 'Aura', value: 'Aura', icon: 'pi pi-star' },
    { label: 'Material', value: 'Material', icon: 'pi pi-android' },
    { label: 'Lara', value: 'Lara', icon: 'pi pi-palette' },
    { label: 'Nora', value: 'Nora', icon: 'pi pi-heart' },
  ];

  handleFontSizeChange(label: string) {
    const size = this.fontSizeMapping[label];
    this.fontSize = size;
    document.documentElement.style.fontSize = size;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const htmlElement = document.querySelector('html');
    htmlElement?.classList.toggle('my-app-dark', this.isDarkMode);
    this.changeSurfacePalette();
  }

  changeTheme(theme: string) {
    if (!theme) return;
    this.themePreset = theme;
    usePreset(theme);
  }

  changeSurfacePalette() {
    if (this.isDarkMode) {
      updateSurfacePalette({
        dark: {
          50: '#1E1E1E',
          100: '#2A2A2A',
          200: '#3A3A3A',
          300: '#4A4A4A',
          400: '#5A5A5A',
          500: '#6A6A6A',
          600: '#7A7A7A',
          700: '#8A8A8A',
          800: '#9A9A9A',
          900: '#AAAAAA',
        },
      });
    } else {
      updateSurfacePalette({
        light: {
          50: '#FFFFFF',
          100: '#F0F0F0',
          200: '#E0E0E0',
          300: '#D0D0D0',
          400: '#C0C0C0',
          500: '#B0B0B0',
          600: '#A0A0A0',
          700: '#909090',
          800: '#808080',
          900: '#707070',
        },
      });
    }
  }
}
