import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from '../question.model';
import { QuestionService } from '../question.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})

export class QuestionDetailComponent implements OnInit, OnDestroy {
  question: Question;
  isLoading = true;
  id: any = null;
  subscription: any = null;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
        this.questionService
          .getQuestion(params.id)
          .then((question: Question) => {
            this.question = question;
            this.isLoading = false;
          })
          .catch(() => this.isLoading = false)
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
