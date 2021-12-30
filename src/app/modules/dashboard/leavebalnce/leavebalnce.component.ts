import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leavebalnce',
  templateUrl: './leavebalnce.component.html',
  styleUrls: ['./leavebalnce.component.scss'],
})
export class LeavebalnceComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  bindTable() {
    // this.leaveService
    //   .GetLeaveBalance(this.selectedResource)
    //   .subscribe((balance) => {
    //     if (balance.StatusCode === 200) {
    //       this.leaveBalances = balance.response;
    //     }
    //   });
  }
}
