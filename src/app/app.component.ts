import {Component, OnInit} from '@angular/core';
import {QuizService} from './services/quiz.service';
import {DarkModeService} from './services/dark-mode.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /** The title of the application */
  title = 'projet-quiz';

  /** The configuration object for the quiz */
  quizConfig: any;

  /**
   * Initializes the AppComponent.
   * @param quizService The service to manage quiz configurations
   * @param darkModeService The service to manage dark mode settings
   * @param router The router service for navigation
   */
  constructor(
    private quizService: QuizService,
    public darkModeService: DarkModeService,
    private router: Router
  ) {
  }

  /**
   * Toggles the dark mode state.
   */
  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  /**
   * Navigates to the home page.
   */
  goToHomePage(): void {
    this.router.navigate(['/']);
  }

  /**
   * Checks if dark mode is enabled.
   * @returns {boolean} True if dark mode is enabled, false otherwise
   */
  get isDarkMode(): boolean {
    return this.darkModeService.isDarkModeEnabled();
  }

  /**
   * Initializes the component and subscribes to quiz configuration changes.
   */
  ngOnInit() {
    this.quizService.quizConfig$.subscribe(config => {
      this.quizConfig = config;
    });
  }
}
