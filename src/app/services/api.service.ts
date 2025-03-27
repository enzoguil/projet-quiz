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

  public getQuestions(amount: number, category: number, type: string, difficulty: string): Observable<Quiz> {
    let url = this.base_url + "?amount=" + amount + "&category=" + category + "&type=" + type + "&difficulty=" + difficulty;
    if(!(category < 9 || category > 32 || category === undefined)) {
      url += "&category=" + category;
    }
    if(!(type === "multiple" || type === "boolean" || type === undefined)) {
      url += "&type=" + type;
    }
    if(!(difficulty === "easy" || difficulty === "medium" || difficulty === "hard" || difficulty === undefined)) {
      url += "&difficulty=" + difficulty;
    }
    console.log(url);
    return this.http.get<Quiz>(url);
  }
}
