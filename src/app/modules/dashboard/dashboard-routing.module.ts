import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from '../dashboard/dashboard/dashboard.page';
import { SalaryComponent } from './account/salary/salary.component';
import { SalaryslipComponent } from './account/salaryslip/salaryslip.component';
import { CelebrationsComponent } from './celebrations/celebrations.component';
import { LeavebalnceComponent } from './leavebalnce/leavebalnce.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  },
  {
    path: 'leavebalance',
    component: LeavebalnceComponent,
  },
  {
    path: 'salary',
    component: SalaryComponent,
  },
  {
    path: 'salaryslip',
    component: SalaryslipComponent,
  },
  {
    path: 'celebration',
    component: CelebrationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
