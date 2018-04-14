import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { Answer } from '../answer/answer.model';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()

export class QuestionService {
  private questionUrl: string;

  constructor(private http: Http) {
    this.questionUrl = `${environment.apiUrl}/questions`;
  }

  handleError(error: any) {
    const message = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return console.log(message);
  }

  getQuestion(id): Promise<void | Question> {
    return this.http.get(`${this.questionUrl}/${id}`)
      .toPromise()
      .then(response => response.json() as Question)
      .catch(this.handleError);
  }

  getQuestions(): Promise<void | Question[]> {
    return this.http.get(this.questionUrl)
      .toPromise()
      .then(response => response.json() as Question[])
      .catch(this.handleError);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  createQuestion(question: Question) {
    const body = JSON.stringify(question);
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const createQuestionUrl = `${this.questionUrl}?token=${this.getToken()}`;

    return this.http.post(createQuestionUrl, body, { headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  createAnswer(answer: Answer) {
    const lightAnswer = {
      description: answer.description,
      question: { _id: answer.question._id }
    };
    const body = JSON.stringify(lightAnswer);
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const createAnswerUrl = `${this.questionUrl}/${answer.question._id}/answers?token=${this.getToken()}`;

    return this.http.post(createAnswerUrl, body, { headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
