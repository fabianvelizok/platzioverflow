import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './../user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  // Reactive forms
  signinForm: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit () {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit () {
    if (!this.signinForm.valid) { return; }
    const { email, password } = this.signinForm.value;
    const newUser = new User(email, password);
    this.authService.signin(newUser)
      .subscribe(
        this.authService.loginAndSaveUser,
        this.authService.handleError,
      );
  }
}
