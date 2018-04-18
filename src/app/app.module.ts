// Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Libs
import { MaterialModules } from './material.modules'; // Material modules
import { MomentModule } from 'angular2-moment';

// Routes
import { Routing } from './app.routes';

// Services
import { QuestionService } from './question/question.service';
import { AuthService } from './auth/auth.service';

// Components
import { AppComponent } from './app.component';
import { QuestionDetailComponent } from './question/question-detail/question-detail.component';
import { AnswerFormComponent } from './answer/answer-form/answer-form.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { QuestionFormComponent } from './question/question-form/question-form.component';
import { QuestionScreenComponent } from './question/question-screen/question-screen.component';


@NgModule({
  declarations: [
    AppComponent,
    QuestionDetailComponent,
    AnswerFormComponent,
    SigninComponent,
    SignupComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionScreenComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModules,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    Routing,
    HttpModule,
  ],
  providers: [
    QuestionService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
