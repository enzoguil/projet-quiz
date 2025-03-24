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

  public getQuestions(amount: Number, category: Number, type: String, difficulty: String): Observable<Quiz> {
    const url = this.base_url + "?amount=" + amount + "&category=" + category + "&type=" + type + "&difficulty=" + difficulty;
    console.log(url);
    return this.http.get<Quiz>(url);
  }
}
