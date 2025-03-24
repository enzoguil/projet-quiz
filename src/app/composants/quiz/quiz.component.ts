import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/model/question';
import { Quiz } from 'src/app/model/quiz';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  public questions$: Observable<Quiz>;
  public currentQuestionIndex: number = 0;
  public selectedAnswer: string | null = null;
  public isAnswerValidated: boolean = false;
  public correctAnswer: string | null = null;
  public shuffledAnswers: string[] = []; // Stocke les réponses mélangées pour la question actuelle
  public score: number = 0;

  constructor(@Inject(ApiService) private api: ApiService) {
    this.questions$ = this.api.getQuestions(10, 9, "multiple", "easy");
  }

  decodeUTF8(value: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = value;
    return textArea.value;
  }

  randomizeAnswers(question: Question): Array<string> {
    let answers = [...question.incorrect_answers];
    answers.push(question.correct_answer);
    return answers.sort(() => Math.random() - 0.5);
  }

  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
  }

  validateAnswer(question: Question): void {
    this.isAnswerValidated = true;
    this.correctAnswer = question.correct_answer;
    if (this.selectedAnswer === question.correct_answer) {
      this.score++;
    }
  }

  nextQuestion(quiz: Quiz): void {
    this.currentQuestionIndex++;
    console.log(quiz.results[this.currentQuestionIndex]);
    this.selectedAnswer = null;
    this.isAnswerValidated = false;
    this.correctAnswer = null;

    this.shuffledAnswers = this.randomizeAnswers(quiz.results[this.currentQuestionIndex]);

    // Mélangez les réponses pour la nouvelle question
    // if (this.questions$) {
    //   this.questions$.subscribe(quiz => {
    //     const currentQuestion = quiz.results[this.currentQuestionIndex];
    //     this.shuffledAnswers = this.randomizeAnswers(currentQuestion);
    //   });
    // }
  }

  // Appelé au chargement initial pour mélanger les réponses de la première question
  initializeShuffledAnswers(quiz: Quiz): void {
    const currentQuestion = quiz.results[this.currentQuestionIndex];
    this.shuffledAnswers = this.randomizeAnswers(currentQuestion);
  }
}