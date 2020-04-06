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
import { UserStatDetailComponent } from './users/user-stat-detail/user-stat-detail.component'

const routes: Routes = [
    {path: 'theme-list', component: ThemeListComponent, data:{animation:'ThemeList'} },
    {path: 'theme-list/:themeid', component: QuizListComponent, data:{animation:'QuizList'}},
    {path: 'theme-edit/:themeid/edit-quiz/:quizid', component: editQuizComponent, data:{animation:'EditQuiz'}},
    {path: 'theme-edit/:themeid/edit-quiz/:quizid/edit-question/:questionid', component: editQuestionComponent, data:{animation:'EditQuestion'}},
    {path: 'theme-edit/:themeid/edit-quiz/:quizid/edit-question/:questionid/edit-answer/:answerid', component: editAnswerComponent, data:{animation:'EditAnswer'}},
    {path: 'user-list', component: UserListComponent, data:{animation:'UserList'}},
    {path: 'user-login', component: UserLoginComponent, data:{animation:'Login'}},
    {path: 'create-user', component: UserFormComponent, data:{animation:'CreateUser'}},
    {path: 'create-quiz', component: QuizFormComponent, data:{animation:'CreateQuiz'}},
    {path: 'create-theme', component: CreateThemeComponent, data:{animation:'CreateTheme'}},
    {path: 'edit-user/:userid', component: editUserComponent, data:{animation:'EditUser'}},
    {path: 'main-admin', component: MainAdminComponent, data:{animation:'MainAdmin'}},
    {path: 'play-quiz/:themeid/quiz/:quizid' , component: PlayQuizComponent, data:{animation:'PlayQuiz'}},
    {path: 'user-stat/:userid' , component: UserStatComponent, data:{animation:'UserStat'}},
    {path: 'user-stat/:userid/details/:resultid' , component: UserStatDetailComponent, data:{animation:'UserStatDetails'}},
    {path: '**', component: UserLoginComponent, data:{animation:'Default'}},
];

@NgModule({
    //Insere les routes dans le module et l'export vers l'appelant
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{
    
}