import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()

export class QuestionService {
  private questionUrl: string

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
      .catch(this.handleError)
  }

  getQuestions(): Promise<void | Question[]> {
    return this.http.get(this.questionUrl)
      .toPromise()
      .then(response => response.json() as Question[])
      .catch(this.handleError)
  }

  createQuestion(question: Question) {
    const body = JSON.stringify(question);
    const headers = new Headers({ 'Content-Type': 'application/json'});

    return this.http.post(this.questionUrl, body, { headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
