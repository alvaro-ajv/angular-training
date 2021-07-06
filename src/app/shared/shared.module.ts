import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directice';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DropdownDirective,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    DropdownDirective,
    LoadingSpinnerComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
