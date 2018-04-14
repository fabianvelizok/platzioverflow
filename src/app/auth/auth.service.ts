import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/Rx';

@Injectable()

export class AuthService {
  private userUrl: string;
  private currentUser?: User;

  constructor(
    private http: Http,
    private router: Router
  ) {
    this.userUrl = `${environment.apiUrl}/auth/signin`;
    if (this.isLoggedIn()) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.currentUser = this.createUserInstance(user);
    }
  }

  createUserInstance(user) {
    return new User(
      user.email,
      null, // Password
      user._id,
      user.firstName,
      user.lastName,
    );
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
    return this.http.post(this.userUrl, body, { headers })
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
    this.router.navigateByUrl('/');
  }
}
