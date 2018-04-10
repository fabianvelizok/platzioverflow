import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from '../../question/question.model';
import icons from '../icons';
import { QuestionService } from '../question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent {
  icons: Object[] = icons;

  constructor(
    private questionService: QuestionService,
    private router: Router,
  ) {}

  getIconClass(icon: any) {
    let iconClass: string = '';

    const iconVersion = icon.versions.font.includes('plain-wordmark')
      ? 'plain-wordmark'
      : icon.versions.font[0];

    iconClass = `devicon-${icon.name}-${iconVersion}`;
    return iconClass;
  }

  onSubmit(form: NgForm) {
    const question = new Question(
      form.value.title,
      form.value.description,
      new Date,
      form.value.icon
    );

    this.questionService.createQuestion(question)
      .subscribe(
        ({ _id }) => {
          this.router.navigate(['questions', _id]);
          form.reset();
        },
        (error) => console.error(error)
      );
  }
}
