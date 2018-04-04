import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // Reactive forms
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (!this.signupForm.valid) { return; }
    const { email, password, firstName, lastName } = this.signupForm.value;
    const newUser = new User(email, password, firstName, lastName);
    console.log(newUser);
  }

}
