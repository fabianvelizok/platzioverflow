import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { QUESTION_ROUTES } from './question/question.routes';

const ROUTES: Routes = [
  { path: '', component: QuestionListComponent, pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'questions', children: QUESTION_ROUTES },
];

const router = RouterModule.forRoot(ROUTES);
export default router;
