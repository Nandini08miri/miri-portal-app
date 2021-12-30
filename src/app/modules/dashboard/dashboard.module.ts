import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard/dashboard.page';
import{SharedModule} from '../shared/shared.module'
import { LeavebalnceComponent } from './leavebalnce/leavebalnce.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage,LeavebalnceComponent
  ],
})
export class DashboardPageModule {}
