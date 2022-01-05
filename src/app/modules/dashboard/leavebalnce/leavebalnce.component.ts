import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { LeaveBalance } from './leave-balance';
import { LeaveService } from './leave.service';

@Component({
  selector: 'app-leavebalnce',
  templateUrl: './leavebalnce.component.html',
  styleUrls: ['./leavebalnce.component.scss'],
})
export class LeavebalnceComponent extends BaseComponent implements OnInit {
  leaveBalances = Array<LeaveBalance>();
  constructor(private leaveService: LeaveService) {
    super();
   }
  @Output() selectedResource= new EventEmitter();
  ngOnInit() {
    this.bindTable();
  }
  bindTable() {
    this.leaveService
      .GetLeaveBalance(this.authservice.Id)
      .subscribe((balance) => {
        if (balance.StatusCode === 200) {
          this.leaveBalances = balance.response;
          this.selectedResource.emit(true);
        }
      });
  }
}
