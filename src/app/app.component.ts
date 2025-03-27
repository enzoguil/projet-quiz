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
  title = 'projet-quiz';
  quizConfig: any;

  constructor(private quizService: QuizService, public darkModeService: DarkModeService, private router: Router) {
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  goToHomePage(): void {
    this.router.navigate(['/']); // Redirige vers la route '/'
  }

  get isDarkMode() {
    return this.darkModeService.isDarkModeEnabled();
  }

  ngOnInit() {
    this.quizService.quizConfig$.subscribe(config => {
      this.quizConfig = config;
    });
  }
}
