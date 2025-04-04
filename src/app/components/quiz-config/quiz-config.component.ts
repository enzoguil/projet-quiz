import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuizService} from "../../services/quiz.service";
import {QuizConfig} from "../../model/formulaire";
import {Router} from "@angular/router";

/**
 * Component for configuring and starting a quiz.
 */
@Component({
  selector: 'app-quiz-config',
  templateUrl: './quiz-config.component.html',
  styleUrls: ['./quiz-config.component.scss']
})
export class QuizConfigComponent implements OnInit {

  /** Form group for quiz configuration */
  quizForm!: FormGroup;

  /** List of quiz categories */
  categories = [
    {id: 9, name: "General Knowledge"},
    {id: 10, name: "Entertainment: Books"},
    {id: 11, name: "Entertainment: Film"},
    {id: 12, name: "Entertainment: Music"},
    {id: 13, name: "Entertainment: Musicals & Theatres"},
    {id: 14, name: "Entertainment: Television"},
    {id: 15, name: "Entertainment: Video Games"},
    {id: 16, name: "Entertainment: Board Games"},
    {id: 17, name: "Science: Science & Nature"},
    {id: 18, name: "Science: Computers"},
    {id: 19, name: "Science: Mathematics"},
    {id: 20, name: "Mythology"},
    {id: 21, name: "Sports"},
    {id: 22, name: "Geography"},
    {id: 23, name: "History"},
    {id: 24, name: "Politics"},
    {id: 25, name: "Art"},
    {id: 26, name: "Celebrities"},
    {id: 27, name: "Animals"},
    {id: 28, name: "Vehicles"},
    {id: 29, name: "Entertainment: Comics"},
    {id: 30, name: "Science: Gadgets"},
    {id: 31, name: "Entertainment: Japanese Anime & Manga"},
    {id: 32, name: "Entertainment: Cartoon & Animations"},
  ]

  /**
   * Constructor for QuizConfigComponent.
   * @param fb FormBuilder instance for creating form groups
   * @param quizService Service for managing quiz configurations
   * @param router Router instance for navigation
   */
  constructor(private fb: FormBuilder, private quizService: QuizService, private router: Router) {
  }

  /**
   * Initializes the component and sets up the quiz form.
   */
  ngOnInit() {
    this.quizForm = this.fb.group({
      name: ['', Validators.required],
      numberOfQuestions: [5, [Validators.required, Validators.min(5), Validators.max(20)]],
      category: [9, Validators.required],
      questionType: ['multiple', Validators.required],
      difficulty: ['medium', Validators.required],
    });
  }

  /**
   * Starts the quiz with the configured settings.
   * If the form is valid, the quiz configuration is set and the user is navigated to the quiz page.
   */
  startQuiz() {
    if (this.quizForm.valid) {
      const config: QuizConfig = this.quizForm.value;
      this.quizService.setQuizConfig(config);

      const amount = this.quizForm.get('numberOfQuestions')?.value;
      const category = this.quizForm.get('category')?.value;
      const type = this.quizForm.get('questionType')?.value;
      const difficulty = this.quizForm.get('difficulty')?.value;

      this.router.navigate([`/quiz/${amount}/${category}/${type}/${difficulty}`], {queryParams: {name: this.quizForm.get('name')?.value}});
    } else {
      console.log("Formulaire invalide");
    }
  }
}
