import { Inject, Injectable } from '@angular/core';
import { Question } from '../model/question';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../model/quiz';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private base_url: string = "https://opentdb.com/api.php";

  constructor(@Inject(HttpClient) private http: HttpClient) {
      
  }

  /**
   * Get quizz's questions from the API
   * @param amount The number of questions to get
   * @param category The category of the questions
   * @param type The type of the questions
   * @param difficulty The difficulty of the questions
   * @returns An observable of the quiz
   */
  public getQuestions(amount: number, category: number, type: string, difficulty: string): Observable<Quiz> {
    let url = this.base_url + "?amount=" + amount + "&category=" + category + "&type=" + type + "&difficulty=" + difficulty;
    // The API only accepts 9 to 32 for category. If number isn't in this range, it will get question of any categories
    if(!(category < 9 || category > 32 || category === undefined)) {
      url += "&category=" + category;
    }
    // The API only accepts boolean, multiple or undefined for type. If value isn't in this correct, it will get question of any types
    if(!(type === "multiple" || type === "boolean" || type === undefined)) {
      url += "&type=" + type;
    }
    // The API only accepts easy, medium, hard or undefined for difficulty. If value isn't correct, it will get question of any difficulties
    if(!(difficulty === "easy" || difficulty === "medium" || difficulty === "hard" || difficulty === undefined)) {
      url += "&difficulty=" + difficulty;
    }
    console.log(url);
    return this.http.get<Quiz>(url);
  }
}
