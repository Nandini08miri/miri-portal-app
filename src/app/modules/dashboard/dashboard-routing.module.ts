import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from '../dashboard/dashboard/dashboard.page';
import { LeavebalnceComponent } from './leavebalnce/leavebalnce.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'leavebalance',
    component: LeavebalnceComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
