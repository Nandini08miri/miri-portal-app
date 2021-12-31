import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PFMonthAndYear } from 'src/app/modals/pfmonth-and-year';
import { SalaryDetail } from 'src/app/modals/salary-slip';
import { AccountserviceService } from '../accountservice.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss'],
})
export class SalaryComponent implements OnInit {
  salary: SalaryDetail;
  public objPFMonthAndYear = new PFMonthAndYear();
  modulechange: any;
  private subscriptions = new Subscription();

  constructor(private account: AccountserviceService) {}

  ngOnInit() {
    this.GetYearAndMonthApplyingPF();
    this.GetAllSalaryDetail();
  }
  GetAllSalaryDetail() {
    this.account.GetSalaryDetailByEmpId().subscribe((data) => {
      if (data.StatusCode === 200) {
        this.salary = data.response;
      }
    });
  }

  GetYearAndMonthApplyingPF() {
    this.account.GetYearAndMonthApplyingPF().subscribe((data) => {
      if (data.StatusCode === 200) {
        this.objPFMonthAndYear = data.response;
      }
    });
  }
}
