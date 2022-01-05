import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard/dashboard.page';
import { SharedModule } from '../shared/shared.module';
import { LeavebalnceComponent } from './leavebalnce/leavebalnce.component';
import { SalaryComponent } from './account/salary/salary.component';
import { CelebrationsComponent } from './celebrations/celebrations.component';
import { SalaryslipComponent } from './account/salaryslip/salaryslip.component';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from "@ionic-native/status-bar/ngx";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DashboardPageRoutingModule,
  ],
  declarations: [
    DashboardPage,
    LeavebalnceComponent,
    SalaryComponent,
    SalaryslipComponent,
    CelebrationsComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
  ],
})
export class DashboardPageModule {}
