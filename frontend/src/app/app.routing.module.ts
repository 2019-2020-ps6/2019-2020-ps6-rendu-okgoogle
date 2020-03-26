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

const routes: Routes = [
    //path = ce qui y aura sur l'url
    //on a une route quiz-list qui affiche le composant QuizListComponent
    //il faut le déclarer dans app.module.ts (edit quiz component)
    {path: 'theme-list', component: ThemeListComponent},
    {path: 'theme-list/:themeid', component: QuizListComponent},
    {path: 'edit-quiz/:quizid', component: editQuizComponent},
    {path: 'users-list', component: UserListComponent},
    {path: 'users-login', component: UserLoginComponent},
    {path: 'create-user', component: UserFormComponent},
    {path: 'create-quiz', component: QuizFormComponent},
    {path: 'create-theme', component: CreateThemeComponent},
    {path: 'edit-user/:userid', component: editUserComponent},
    {path: 'main-admin', component: MainAdminComponent},
    {path: '', component: UserLoginComponent}
];

@NgModule({
    //Insere les routes dans le module et l'export vers l'appelant
    imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})

export class AppRoutingModule{
    
}