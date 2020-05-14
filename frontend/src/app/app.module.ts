import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { QuizListComponent } from './quiz/quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quiz/quizzes/quiz/quiz.component';
import { QuizFormComponent } from './admin/creation/create-quiz/quiz-form.component';
import { HttpClientModule }    from '@angular/common/http';
import { editQuizComponent } from './admin/gestion/edit-quiz/edit-quiz.component';
import { questionComponent } from './quiz/questions/question/question.component';
import { QuestionListComponent } from './quiz/questions/question-list/question-list.component';
import { QuestionFormComponent } from './admin/creation/question-form/question-form.component';
import { UserFormComponent } from './admin/creation/create-user/user-form.component';
import { UserComponent } from './users/user/user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserStatComponent } from './users/user-stat/user-stat.component';
import { UserStatDetailComponent } from './users/user-stat-detail/user-stat-detail.component'
import { editUserComponent } from './admin/gestion/edit-user/edit-user.component';
import { UserLoginComponent } from './home-page/user-login.component';
import { MainAdminComponent } from './admin/main-admin/main-admin.component';
import { ThemeComponent } from './quiz/themes/theme/theme.component';
import { editThemeComponent } from './admin/gestion/edit-theme/edit-theme.component';
import { ThemeListComponent } from './quiz/themes/theme-list/theme-list.component';
import { CreateThemeComponent } from './admin/creation/create-theme/create-theme.component';
import { PlayQuizComponent } from './quiz/quizzes/play-quiz/play-quiz.component';
import { AnswerComponent } from './quiz/answers/answer/answer.component';
import { AnswerListComponent } from './quiz/answers/answer-list/answer-list.component';
import { SearchBarComponent } from './utils/searchBar/search-bar.component';

import { AppRoutingModule } from './app.routing.module';

import { FormsModule } from '@angular/forms';

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    editQuizComponent,
    QuizComponent,
    QuizFormComponent,
    QuestionListComponent,
    QuestionFormComponent,
    questionComponent,
    UserFormComponent,
    UserComponent,
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
    UserStatComponent,
    UserStatDetailComponent,
    editThemeComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
