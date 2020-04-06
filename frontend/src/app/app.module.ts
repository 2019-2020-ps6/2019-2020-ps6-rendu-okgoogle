import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent } from './app.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizAdminComponent } from './admin/quiz-admin/quiz-admin.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizFormComponent } from './admin/create-quiz/quiz-form.component';
import { HttpClientModule }    from '@angular/common/http';
import { editQuizComponent } from './admin/edit-quiz/edit-quiz.component';
import { questionComponent } from './questions/question/question.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionFormComponent } from './admin/question-form/question-form.component';
import { UserFormComponent } from './admin/create-user/user-form.component';
import { UserAdminComponent } from './admin/user-admin/user-admin.component';
import { UserComponent } from './users/user/user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserStatComponent } from './users/user-stat/user-stat.component';
import { UserStatDetailComponent } from './users/user-stat-detail/user-stat-detail.component'
import { editUserComponent } from './admin/edit-user/edit-user.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { MainAdminComponent } from './admin/main-admin/main-admin.component';
import { ThemeComponent } from './themes/theme/theme.component';
import { ThemeListComponent } from './themes/theme-list/theme-list.component';
import { CreateThemeComponent } from './admin/create-theme/create-theme.component';
import { PlayQuizComponent } from './quizzes/play-quiz/play-quiz.component';
import { AnswerComponent } from './answers/answer/answer.component';
import { AnswerListComponent } from './answers/answer-list/answer-list.component';
import { editAnswerComponent } from './admin/edit-answer/edit-answer.component';
import { editQuestionComponent } from './admin/edit-question/edit-question.component';
import { AnswerFormComponent } from './answers/answer-form/answer-form.component';

import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    editQuizComponent,
    QuizComponent,
    QuizAdminComponent,
    HeaderComponent,
    QuizFormComponent,
    QuestionListComponent,
    QuestionFormComponent,
    questionComponent,
    UserFormComponent,
    UserComponent,
    UserAdminComponent,
    UserListComponent,
    UserLoginComponent,
    editUserComponent,
    MainAdminComponent,
    ThemeComponent,
    ThemeListComponent,
    CreateThemeComponent,
    PlayQuizComponent,
    AnswerComponent,
    AnswerListComponent,
    AnswerFormComponent,
    editAnswerComponent,
    editQuestionComponent,
    UserStatComponent,
    UserStatDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
