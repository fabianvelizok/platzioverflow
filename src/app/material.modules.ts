import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { NgModule } from '@angular/core';

const modules = [
  MatButtonModule,
  MatCheckboxModule
];

@NgModule({
  imports: modules,
  exports: modules,
})

export class MaterialModules {}
