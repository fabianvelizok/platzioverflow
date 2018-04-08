import { Component } from '@angular/core';
import { Question } from '../question.model';

const q = new Question(
  'New question about android',
  'Android.manifest',
  new Date,
  'question-icon devicon-android-plain colored'
);

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent {
  questions: Question[] = new Array(10).fill(q);
}
