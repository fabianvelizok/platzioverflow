import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Answer } from '../answer.model';
import { Question } from '../../question/question.model';
import { User } from '../../auth/user.model';
import { QuestionService } from '../../question/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})

export class AnswerFormComponent {
  @Input() question: Question;

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    const answer = new Answer(
      form.value.description,
      this.question,
      new Date(),
      null,
    );

    this.questionService.createAnswer(answer)
      .subscribe(
        (answer) => {
          this.question.answers.unshift(answer);
          form.reset();
        },
        (error) => console.error(error)
      );
  }

}
