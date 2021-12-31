import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcesdropdownComponent } from './resourcesdropdown/resourcesdropdown.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
@NgModule({
  declarations: [ResourcesdropdownComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
  ],
  exports: [ResourcesdropdownComponent],
})
export class SharedModule {}
