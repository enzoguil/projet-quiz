import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private isDarkMode: boolean = false;

  /**
   * Initializes the DarkModeService.
   * Sets the initial dark mode state based on localStorage and updates the theme.
   */
  constructor() {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.updateTheme();
  }

  /**
   * Toggles the dark mode state and updates the theme.
   * Saves the current dark mode state to localStorage.
   */
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', String(this.isDarkMode));
    this.updateTheme();
  }

  /**
   * Updates the theme based on the current dark mode state.
   * Adds or removes the 'dark' class from the document's root element.
   */
  private updateTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  /**
   * Checks if dark mode is enabled.
   * @returns {boolean} True if dark mode is enabled, false otherwise.
   */
  isDarkModeEnabled(): boolean {
    return this.isDarkMode;
  }
}
