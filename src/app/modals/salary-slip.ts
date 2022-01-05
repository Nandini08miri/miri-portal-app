export class SalarySlip {
public  EmpId:number;
public EmpName:string;
public  SalarySlipId:number
public  SalaryYear:string; 
public  SalaryMonth:string; 
public  SalaryDate:string; 
public  TotalWorkingDay:number;
public  LeaveInMonth :number=0;
public  LeaveDeduction:number=0;
public  TotalSalaryPM:number;
public  TaxDeductionPM:number=0;
public  OtherDeduction:number=0;
public  ReasonForOtherDeduction:string;
public  Incentives:number=0;
public  BasicSalary:number;
public  HRA :number;
public  LTA:number;
public  Medical:number;
public  OtherSpecialAllowence:number;
public  TotalPaybleSalary:number;
public  IsSalaryGenerated :boolean;
public  TotalCount :number;
public MonthlySalary :number;
public PFAmount:number=0;
public Gratuity:number=0;
}
