import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public name: string | null = null;

  constructor(@Inject(ActivatedRoute) private route : ActivatedRoute, @Inject(ApiService) private api: ApiService) {
    const amount = this.route.snapshot.paramMap.get('amount');
    const category = this.route.snapshot.paramMap.get('category');
    const type = this.route.snapshot.paramMap.get('type');
    const difficulty = this.route.snapshot.paramMap.get('difficulty');
    this.name = this.route.snapshot.queryParamMap.get('name');
    this.questions$ = this.api.getQuestions(Number(amount), Number(category), type ?? 'multiple', difficulty ?? 'easy');
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