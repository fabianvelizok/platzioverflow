import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
} from '@angular/material';

const modules = [
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})

export class MaterialModules {}
