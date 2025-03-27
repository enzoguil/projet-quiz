import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';

const routes: Routes = [
  {path : 'quiz/:amount/:category/:type:/:difficulty', component: QuizComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
