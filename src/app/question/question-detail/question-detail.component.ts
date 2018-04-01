import { Component } from '@angular/core';
import { Question } from '../question.model';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})

export class QuestionDetailComponent {
  question: Question = new Question(
    'New question about android',
    'Android.manifest',
    new Date,
    'question-icon devicon-android-plain colored'
  );

}
