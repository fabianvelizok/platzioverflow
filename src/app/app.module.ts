// Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Libs
import { MaterialModules } from './material.modules'; // Material modules
import { MomentModule } from 'angular2-moment';

// Components
import { AppComponent } from './app.component';
import { QuestionDetailComponent } from './question/question-detail/question-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    QuestionDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModules,
    MomentModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
