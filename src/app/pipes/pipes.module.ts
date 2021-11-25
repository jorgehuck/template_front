import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplaceNullWithTextPipe } from './replace-null-with-text.pipe'


@NgModule({
  declarations: [

    ReplaceNullWithTextPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ReplaceNullWithTextPipe
  ]
})
export class PipesModule { }
