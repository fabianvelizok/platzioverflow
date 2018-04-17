import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import 'rxjs/Rx';

@Injectable()

export class AuthService {
  private userUrl: string;
  private currentUser?: User;

  constructor(
    private http: Http,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.userUrl = `${environment.apiUrl}/auth`;
    if (this.isLoggedIn()) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.currentUser = this.createUserInstance(user);
    }
  }

  loginAndSaveUser({token, user}) {
    this.currentUser = this.createUserInstance(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(this.currentUser));
    this.router.navigateByUrl('/');
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type' : 'application/json' });
    return this.http.post(`${this.userUrl}/signin`, body, { headers })
      .map((response: Response) => {
        const authJson = response.json();
        this.loginAndSaveUser(authJson);
        return authJson;
      })
      .catch((error: Response) => {
        console.error(error);
        return Observable.throw(error.json());
      });
  }

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type' : 'application/json' });
    return this.http.post(`${this.userUrl}/signup`, body, { headers })
      .map((response: Response) => {
        const authJson = response.json();
        this.loginAndSaveUser(authJson);
        return authJson;
      })
      .catch((error: Response) => {
        console.error(error);
        return Observable.throw(error.json());
      });
  }

  isLoggedIn() {
    return Boolean(localStorage.getItem('token'));
  }

  logout() {
    localStorage.clear();
    this.currentUser = null;
    this.router.navigateByUrl('/signin');
  }

  showError(_message) {
    const message = _message || 'There was an error. Please, try again.';
    this.snackBar.open(message, 'X', { duration: 2500 });
  }

  public createUserInstance = (user: User) => {
    return new User(
      user.email,
      null, // Password
      user._id,
      user.firstName,
      user.lastName,
    );
  }

  public handleError = (error: any) => {
    const { error: { name }, message } = error;

    if (name === 'TokenExpiredError') {
      this.showError('Your session has expired.');
    } else if (name === 'JsonWebTokenError') {
      this.showError('There was a problem with your session.');
    } else {
      this.showError(message);
    }

    this.logout();
  }
}
