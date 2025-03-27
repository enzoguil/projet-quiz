import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizConfigSource = new BehaviorSubject<any>(null);
  quizConfig$ = this.quizConfigSource.asObservable();

  setQuizConfig(config: any) {
    this.quizConfigSource.next(config);
  }
}
