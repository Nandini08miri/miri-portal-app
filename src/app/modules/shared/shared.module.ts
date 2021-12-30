import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcesdropdownComponent } from './resourcesdropdown/resourcesdropdown.component';



@NgModule({
  declarations: [
    ResourcesdropdownComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ResourcesdropdownComponent]
 
})
export class SharedModule { }
