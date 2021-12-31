import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EncrDecrService } from 'src/app/core/services/encr-decr.service';
@Injectable({
  providedIn: 'root',
})
export class AccountserviceService {
  private baseUrl = environment.baseUrl;
  private getsalary = this.baseUrl + '/api/Salary/';
  public resource: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(
    private apiService: ApiService,
    private encrDecrService: EncrDecrService
  ) {
    if (location.hostname.indexOf('192.168.1.') >= 0) {
      this.baseUrl = environment.localbaseUrl;
      this.getsalary = this.baseUrl + 'api/Salary/';
    }
  }
  GetYearAndMonthApplyingPF() {
    return this.apiService.get(this.getsalary + 'GetYearAndMonthApplyingPF');
  }
  GetSalaryDetailByEmpId() {
    return this.apiService.get(this.getsalary + 'GetSalaryDetailByEmpId').pipe(
      map((data) => {
        console.log(data);
        this.Decrptsalarydetail(data.response);
        return data;
      })
    );
  }
  Decrptsalarydetail(details) {
    details.BasicSalary = this.encrDecrService.Decrypt(details.BasicSalary);
    details.HRA = this.encrDecrService.Decrypt(details.HRA);
    details.SpecialAllowence = this.encrDecrService.Decrypt(
      details.SpecialAllowence
    );
    details.TDSDeducton = this.encrDecrService.Decrypt(details.TDSDeducton);
    details.TotalPaybleSalary = this.encrDecrService.Decrypt(
      details.TotalPaybleSalary
    );
    if (details.PFAmount == null) {
      details.PFAmount = 0;
    } else {
      details.PFAmount = parseFloat(
        this.encrDecrService.Decrypt(details.PFAmount)
      );
    }
    if (details.Gratuity == null) {
      details.Gratuity = 0;
    } else {
      details.Gratuity = parseFloat(
        this.encrDecrService.Decrypt(details.Gratuity)
      );
    }
  }

  Encrptsalaryslip(details, encryptedSalarySlip) {
    encryptedSalarySlip.EmpId = details.EmpId;
    encryptedSalarySlip.EmpName = details.EmpName;
    encryptedSalarySlip.UserId = details.UserId;
    encryptedSalarySlip.SalarySlipId = details.SalarySlipId;
    encryptedSalarySlip.LTA = details.LTA;
    encryptedSalarySlip.Medical = details.Medical;
    encryptedSalarySlip.SalaryYear = details.SalaryYear;
    encryptedSalarySlip.SalaryMonth = details.SalaryMonth;
    encryptedSalarySlip.SalaryDate = details.SalaryDate;
    encryptedSalarySlip.TotalWorkingDay = details.TotalWorkingDay;
    encryptedSalarySlip.LeaveInMonth = details.LeaveInMonth;
    encryptedSalarySlip.TotalCount = details.TotalCount;
    encryptedSalarySlip.IsSalaryGenerated = details.IsSalaryGenerated;
    encryptedSalarySlip.BasicSalary = this.encrDecrService.Encrypt(
      details.BasicSalary
    );
    encryptedSalarySlip.HRA = this.encrDecrService.Encrypt(details.HRA);
    encryptedSalarySlip.OtherSpecialAllowence = this.encrDecrService.Encrypt(
      details.OtherSpecialAllowence
    );
    encryptedSalarySlip.TaxDeductionPM = this.encrDecrService.Encrypt(
      details.TaxDeductionPM
    );
    encryptedSalarySlip.TotalPaybleSalary = this.encrDecrService.Encrypt(
      details.TotalPaybleSalary
    );
    encryptedSalarySlip.PFAmount = this.encrDecrService.Encrypt(
      details.PFAmount
    );
    encryptedSalarySlip.Gratuity = this.encrDecrService.Encrypt(
      details.Gratuity
    );
    encryptedSalarySlip.LeaveDeduction = this.encrDecrService.Encrypt(
      details.LeaveDeduction
    );
    encryptedSalarySlip.TotalSalaryPM = this.encrDecrService.Encrypt(
      details.TotalSalaryPM
    );
    encryptedSalarySlip.Incentives = this.encrDecrService.Encrypt(
      details.Incentives
    );
    encryptedSalarySlip.OtherDeduction = this.encrDecrService.Encrypt(
      details.OtherDeduction
    );
    encryptedSalarySlip.MonthlySalary = this.encrDecrService.Encrypt(
      details.MonthlySalary
    );
  }
}
