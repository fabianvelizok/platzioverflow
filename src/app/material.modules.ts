import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatInputModule,
  MatButtonModule,
  MatGridListModule,
  MatRadioModule,
} from '@angular/material';

const modules = [
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatInputModule,
  MatButtonModule,
  MatGridListModule,
  MatRadioModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})

export class MaterialModules {}
