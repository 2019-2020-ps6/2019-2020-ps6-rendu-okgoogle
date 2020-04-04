import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {editQuizComponent} from './admin/edit-quiz/edit-quiz.component';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {ThemeListComponent} from './themes/theme-list/theme-list.component';
import {UserListComponent} from './users/user-list/user-list.component';
import {UserLoginComponent} from './users/user-login/user-login.component';
import {UserFormComponent} from './admin/create-user/user-form.component';
import {QuizFormComponent} from './admin/create-quiz/quiz-form.component';
import {editUserComponent} from './admin/edit-user/edit-user.component';
import {CreateThemeComponent} from './admin/create-theme/create-theme.component';
import {MainAdminComponent} from './admin/main-admin/main-admin.component';
import {PlayQuizComponent} from  './quizzes/play-quiz/play-quiz.component';
import { editQuestionComponent } from './admin/edit-question/edit-question.component'
import { editAnswerComponent } from './admin/edit-answer/edit-answer.component'
import { UserStatComponent } from './users/user-stat/user-stat.component'

const routes: Routes = [
    {path: 'theme-list', component: ThemeListComponent},
    {path: 'theme-list/:themeid', component: QuizListComponent},
    {path: 'theme-edit/:themeid/edit-quiz/:quizid', component: editQuizComponent},
    {path: 'theme-edit/:themeid/edit-quiz/:quizid/edit-question/:questionid', component: editQuestionComponent},
    {path: 'theme-edit/:themeid/edit-quiz/:quizid/edit-question/:questionid/edit-answer/:answerid', component: editAnswerComponent},
    {path: 'user-list', component: UserListComponent},
    {path: 'user-login', component: UserLoginComponent},
    {path: 'create-user', component: UserFormComponent},
    {path: 'create-quiz', component: QuizFormComponent},
    {path: 'create-theme', component: CreateThemeComponent},
    {path: 'edit-user/:userid', component: editUserComponent},
    {path: 'main-admin', component: MainAdminComponent},
    {path: 'play-quiz/:themeid/quiz/:quizid' , component: PlayQuizComponent},
    {path: 'user-stat/:userid' , component: UserStatComponent},
    {path: '', component: UserLoginComponent},
];

@NgModule({
    //Insere les routes dans le module et l'export vers l'appelant
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{
    
}