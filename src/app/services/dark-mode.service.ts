import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private isDarkMode: boolean = false;

  constructor() {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.updateTheme();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', String(this.isDarkMode));
    this.updateTheme();
  }

  private updateTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  isDarkModeEnabled(): boolean {
    return this.isDarkMode;
  }
}
