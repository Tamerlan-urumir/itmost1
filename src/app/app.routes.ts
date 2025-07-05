import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { AnswerPage } from './pages/answer-page/answer-page';
import { QuestionPage } from './pages/question-page/question-page';
import { Quest } from './pages/quest/quest';
import { QuestionDetailComponent  } from './pages/q-a-page/q-a-page';
import { Registuser } from './pages/registuser/registuser';
import { User } from './pages/user/user';
export const routes: Routes = [
    {path:'login',component:LoginPage},
    {path:'register',component:RegisterPage},
    {path:'answer',component:AnswerPage},
    {path:'question',component:QuestionPage},
    {path:'qa',component:QuestionDetailComponent },
    {path:'registuser',component:Registuser},
    {path:'user',component:User},
    {path:'',component:Quest}

];
