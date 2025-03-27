import { Component, OnInit } from '@angular/core';
import { QuizService } from './services/quiz.service';
import { DarkModeService } from './services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'projet-quiz';
  quizConfig: any;

  constructor(private quizService: QuizService, public darkModeService: DarkModeService) {}

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
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
