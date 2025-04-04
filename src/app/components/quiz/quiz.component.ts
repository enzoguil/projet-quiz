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
  public correctAnswer: any | null = null;
  public shuffledAnswers: string[] = [];
  public score: number = 0;
  public name: string | null = null;

  /**
   * Get quizz's questions from the API
   */
  constructor(@Inject(ActivatedRoute) private route : ActivatedRoute, @Inject(ApiService) private api: ApiService) {
    const amount = this.route.snapshot.paramMap.get('amount');
    const category = this.route.snapshot.paramMap.get('category');
    const type = this.route.snapshot.paramMap.get('type');
    const difficulty = this.route.snapshot.paramMap.get('difficulty');
    this.name = this.route.snapshot.queryParamMap.get('name');
    this.questions$ = this.api.getQuestions(Number(amount), Number(category), type ?? 'multiple', difficulty ?? 'easy');
  }

  // Decode UTF-8 characters in the question and answers
  decodeUTF8(value: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = value;
    return textArea.value;
  }

  // randomize the order of answers
  randomizeAnswers(question: Question): Array<string> {
    let answers = [...question.incorrect_answers];
    if(typeof question.correct_answer === 'string') answers.push(question.correct_answer);
    else answers.push(...question.correct_answer);
    return answers.sort(() => Math.random() - 0.5);
  }

  // Select the answer and store it in selectedAnswer
  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
  }

  // Validate the answer and check if it's correct
  validateAnswer(question: Question): void {
    this.isAnswerValidated = true;
    this.correctAnswer = question.correct_answer;
    if ((this.selectedAnswer === question.correct_answer) || (Array.isArray(question.correct_answer) && question.correct_answer.includes(this.selectedAnswer))) {
      this.score++;
    }
  }

  // Go to the next question and shuffle the answers
  nextQuestion(quiz: Quiz): void {
    this.currentQuestionIndex++;
    console.log(quiz.results[this.currentQuestionIndex]);
    this.selectedAnswer = null;
    this.isAnswerValidated = false;
    this.correctAnswer = null;

    this.shuffledAnswers = this.randomizeAnswers(quiz.results[this.currentQuestionIndex]);
  }

  // Called on initial load to shuffle the answers of the first question
  initializeShuffledAnswers(quiz: Quiz): void {
    const currentQuestion = quiz.results[this.currentQuestionIndex];
    this.shuffledAnswers = this.randomizeAnswers(currentQuestion);
  }
}