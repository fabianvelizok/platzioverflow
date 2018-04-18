import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { QuestionScreenComponent } from './question/question-screen/question-screen.component';
import { QUESTION_ROUTES } from './question/question.routes';

const ROUTES: Routes = [
  { path: '', component: QuestionScreenComponent, pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'questions', children: QUESTION_ROUTES },
];

export const Routing = RouterModule.forRoot(ROUTES);
