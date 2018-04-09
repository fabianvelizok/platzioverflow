import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import { QuestionService } from '../question.service';

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

export class QuestionListComponent implements OnInit {
  questions: Question[];
  loading = true;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService
      .getQuestions()
      .then((questions: Question[]) => this.questions = questions)
  }
}
