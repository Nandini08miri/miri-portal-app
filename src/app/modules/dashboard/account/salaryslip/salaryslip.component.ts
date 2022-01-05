import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PFMonthAndYear } from 'src/app/modals/pfmonth-and-year';
import { SalarySlip } from 'src/app/modals/salary-slip';
import { BaseComponent } from 'src/app/modules/base.component';
import { EmployesService } from 'src/app/service/employes.service';

@Component({
  selector: 'app-salaryslip',
  templateUrl: './salaryslip.component.html',
  styleUrls: ['./salaryslip.component.scss'],
})
export class SalaryslipComponent extends BaseComponent implements OnInit {
  public objSalaryDetail = new SalarySlip();
  public objPFMonthAndYear = new PFMonthAndYear();
  SalarySlip: Array<SalarySlip>;
  private subscriptions = new Subscription();
  constructor(private account: EmployesService) {
    super();
  }

  ngOnInit() {
    this.GetSalarySlip();
  }
  
  GetSalarySlip() {
    this.subscriptions.add(this.account.GetSalarySlipbyEmpId(this.authservice.Id).subscribe(data => {
      if (data.StatusCode === 200) {
        this.SalarySlip = data.response;
      }
    }));
  }

  GetYearAndMonthApplyingPF() {
    this.account.GetYearAndMonthApplyingPF().subscribe((data) => {
      if (data.StatusCode === 200) {
        this.objPFMonthAndYear = data.response;
      }
    });
  }
}
