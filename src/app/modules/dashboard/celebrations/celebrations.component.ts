import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Birthdayanniversaries } from 'src/app/modals/birthdayanniversaries';
import { Holiday } from 'src/app/modals/holiday';
import { EmployesService } from 'src/app/service/employes.service';

@Component({
  selector: 'app-celebrations',
  templateUrl: './celebrations.component.html',
  styleUrls: ['./celebrations.component.scss'],
  providers: [DatePipe]
})
export class CelebrationsComponent implements OnInit {
  birthdaysAnniversaries = Array<Birthdayanniversaries>();
  holidays = Array<Holiday>();
  Month: string = '';
  constructor(private datePipe: DatePipe,private employeeservice:EmployesService) { }

  ngOnInit() {
    var date = this.datePipe.transform(new Date(), 'MM/dd/yyyy');    
    this.Month =date;
    this.GetDOBData(date);
  }
  GetDOBData(date) {
    this.employeeservice.getDOBandAnniversaryOfMonth(date).subscribe(birthdaysAnniversary => {
      if (birthdaysAnniversary.StatusCode == '200') {
        this.birthdaysAnniversaries = birthdaysAnniversary.response.BirthdaysAnniversaries;
        this.holidays = birthdaysAnniversary.response.Holiday;
        //this.Month = birthdaysAnniversary.response.DOBMonth;
      }
      this.Month = date;
    });
  }
  dobFirstClick() {
    var date = new Date(this.Month);
    var newdate = '01/01/' + date.getFullYear();
    this.GetDOBData(newdate);
  }

  dobPreviousClick() {
    var date = new Date(this.Month);
    var mon = date.getMonth();
    var newdate = (mon < 1 ? '12' : mon) + '/01/' + date.getFullYear();
    this.GetDOBData(newdate);
  }

  dobNextClick() {
    var date = new Date(this.Month);
    var mon = date.getMonth() + 2;
    var newdate = (mon > 12 ? '01' : mon) + '/01/' + date.getFullYear();
    this.GetDOBData(newdate);
  }

  dobLastClick() {
    var date = new Date(this.Month);
    var newdate = '12/01/' + date.getFullYear();
    this.GetDOBData(newdate);
  }
}
