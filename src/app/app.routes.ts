import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { QuestionListComponent } from './question/question-list/question-list.component';

const ROUTES: Routes = [
  { path: '', component: QuestionListComponent, pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
];

const router = RouterModule.forRoot(ROUTES);
export default router;
