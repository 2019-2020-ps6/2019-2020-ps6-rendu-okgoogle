import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import { HttpClientModule }    from '@angular/common/http';
import { editQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { questionComponent } from './questions/question/question.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserComponent } from './users/user/user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    editQuizComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    QuestionListComponent,
    QuestionFormComponent,
    questionComponent,
    UserFormComponent,
    UserComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
