import { Component } from '@angular/core';
import { Question } from '../question.model';

const q = new Question(
  'New question about android',
  'Android.manifest',
  new Date,
  'devicon-android-plain colored'
);

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})

export class QuestionListComponent {
  questions: Question[] = new Array(20).fill(q);
}
