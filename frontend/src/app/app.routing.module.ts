import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {editQuizComponent} from './quizzes/edit-quiz/edit-quiz.component';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {UserListComponent} from './users/user-list/user-list.component';
import {UserLoginComponent} from './users/user-login/user-login.component';

const routes: Routes = [
    //path = ce qui y aura sur l'url
    //on a une route quiz-list qui affiche le composant QuizListComponent
    //il faut le déclarer dans app.module.ts (edit quiz component)
    {path: 'quiz-list', component: QuizListComponent},
    {path: 'edit-quiz/:id', component: editQuizComponent},
    {path: 'users-list', component: UserListComponent},
    {path: 'users-login', component: UserLoginComponent},
    {path: '', component: UserLoginComponent}
];

@NgModule({
    //Insere les routes dans le module et l'export vers l'appelant
    imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})

export class AppRoutingModule{
    
}