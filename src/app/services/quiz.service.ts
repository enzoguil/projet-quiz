import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /** BehaviorSubject to hold the current quiz configuration */
  private quizConfigSource = new BehaviorSubject<any>(null);

  /** Observable for the quiz configuration */
  quizConfig$ = this.quizConfigSource.asObservable();

  /**
   * Sets the quiz configuration.
   * @param config The configuration object for the quiz
   */
  setQuizConfig(config: any) {
    this.quizConfigSource.next(config);
  }
}
