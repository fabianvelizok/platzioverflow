import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})

export class QuestionListComponent implements OnInit {
  questions: Question[];
  isLoading = true;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService
      .getQuestions()
      .then((questions: Question[]) => {
        this.questions = questions;
        this.isLoading = false;
      })
      .catch(() => this.isLoading = false)
  }
}
