import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizConfigComponent } from './components/quiz-config/quiz-config.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuizConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
