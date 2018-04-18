import { QuestionScreenComponent } from './question-screen/question-screen.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionFormComponent } from './question-form/question-form.component';

export const QUESTION_ROUTES = [
  { path: '', component: QuestionScreenComponent },
  { path: 'new', component: QuestionFormComponent },
  { path: ':id', component: QuestionDetailComponent },
];
