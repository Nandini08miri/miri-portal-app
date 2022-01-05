import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../core/services/api.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EncrDecrService } from '../core/services/encr-decr.service';
import { EncryptedSalaryDetail } from 'src/app/modals/encrypted-salary-detail';
import { map } from 'rxjs/operators';
import { SalaryDetail } from '../modals/salary-details';
import { EncryptedSalarySlip } from 'src/app/modals/encrypted-salary-slip';
import { UserAndSalaryDetail } from '../modals/user-and-salary-detail';
import { Approverstructure } from '../modals/approverstructure';
import { Resource } from '../modals/resource';
@Injectable({
  providedIn: 'root'
})
export class EmployesService {

  private baseUrl = environment.baseUrl;
  private getEmpApiUrl = this.baseUrl + 'api/Employee/';
  private gettimeApiUrl = this.baseUrl + 'api/TimeTracking/';
  private getbdayApiUrl = this.baseUrl + '/api/Birthday/';
  private getholidayApiUrl = this.baseUrl + '/api/Holiday/';
  private getsalary = this.baseUrl + '/api/Salary/';
  public heading: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public resourceUname: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public UserId: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public EmpId: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public salarydetailid: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public Aadhardcard: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public modulechangepwd: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public approverStructure: BehaviorSubject<Approverstructure> = new BehaviorSubject<Approverstructure>( new Approverstructure);
  public resource: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public date;
  constructor(private apiService: ApiService, private httpClient: HttpClient, private EncrDecrService: EncrDecrService) {
    if (location.hostname.indexOf("192.168.1.") >= 0) {
      this.baseUrl = environment.localbaseUrl;
      this.getEmpApiUrl = this.baseUrl + 'api/Employee/';
      this.gettimeApiUrl = this.baseUrl + 'api/TimeTracking/';
      this.getbdayApiUrl = this.baseUrl + '/api/Birthday/';
      this.getholidayApiUrl = this.baseUrl + '/api/Holiday/';
      this.getsalary = this.baseUrl + '/api/Salary/';
    }
  }
  trim(data) {
    for (const item in data) {
      if (typeof data[item] === 'string') {
        data[item] = data[item].trim();
      }
    }
    return data;
  }
  setEmpId(Id) {
    this.EmpId.next(Id)
  }
  getEmpId() {
    return this.EmpId.asObservable();
  }


  setsalaryId(Id) {
    this.salarydetailid.next(Id)
  }
  getsalaryId() {
    return this.salarydetailid.value;
  }


  setDate(date) {
    this.date = date;
  }
  getDate() {
    return this.date;
  }
  GetResourceName(UserData) {
    return this.apiService.get(this.getEmpApiUrl + 'GetResourceName?Login=' + UserData);
  }
  GetTimeDurationByUser(UserData) {
    return this.apiService.post(this.gettimeApiUrl + 'GetTimeDurationByUser', UserData);
  }
  GetTrackingDetailByUser(RequstDetail) {
    return this.apiService.post(this.gettimeApiUrl + 'GetTrackingDetailByUser', RequstDetail);
  }
  GetTrackerApplicationFile() {
    return this.apiService.get(this.gettimeApiUrl + 'GetTrackerApplicationFile');
  }
  GetTotalTimeInDateRangebyUser(RequstDetail) {
    return this.apiService.post(this.gettimeApiUrl + 'GetTotalTimeInDateRangebyUser', RequstDetail);
  }
  EmployeesStatus(date) {
    return this.apiService.post(this.getEmpApiUrl + 'EmployeesStatus',date);
  }
  ChangeDateFormat(date, seperator, finalseprator) {
    var newdate = null;
    if (date) {
      var splitdate = date.split(seperator);
      newdate = splitdate[1] + finalseprator + splitdate[0] + finalseprator + splitdate[2];
    }
    return newdate;
  }



  GetTotalTimeInDateRange(RequstDetail) {
    return this.apiService.post(this.gettimeApiUrl + 'GetTotalTimeInDateRange', RequstDetail);
  }
  GetweeklyReportByUser(RequstDetail) {
    return this.apiService.post(this.gettimeApiUrl + 'GetweeklyReportByUser', RequstDetail);
  }
  InsertDbRecord(resource) {
    var encryresource = new UserAndSalaryDetail();
    encryresource.Employee = new Resource();
    encryresource.SalaryDetail = new SalaryDetail();
    this.Encrptsalarydetail(resource.SalaryDetail, encryresource.SalaryDetail);
    this.Encrptresourcedetail(resource.Employee, encryresource.Employee);
    return this.apiService.post(this.getEmpApiUrl + 'InsertDbRecord', encryresource);
  }
  GetNewEmployeeId() {
    return this.apiService.get(this.getsalary + 'GetNewEmployeeId');
  }
  GetDailyWeeklyDetail(RequstDetail) {
    return this.apiService.post(this.gettimeApiUrl + 'GetDailyWeeklyDetail', RequstDetail);
  }
  GetDailyTotalTime(RequstDetail) {
    return this.apiService.post(this.gettimeApiUrl + 'GetDailyTotalTime', RequstDetail);
  }
  GetDepartment() {
    return this.apiService.get(this.gettimeApiUrl + 'GetDepartment');
  }
  GetDesignation() {
    return this.apiService.get(this.gettimeApiUrl + 'GetDesignation?ID=1');
  }
  set(heading) {
    this.heading.next(heading)
  }
  get() {
    return this.heading.asObservable();
  }
  getuserid() {
    return this.UserId.value;
  }
  setuserid(Id) {
    this.UserId.next(Id)
  }
  GetResourceEntryDetail() {
    return this.apiService.get(this.getEmpApiUrl + 'GetResourceEntryDetail');
  }
  UpdateDbRecord(resource) {
    var encryresource = new UserAndSalaryDetail();
    encryresource.Employee =new Resource();
    encryresource.SalaryDetail = new SalaryDetail();
    this.Encrptsalarydetail(resource.SalaryDetail, encryresource.SalaryDetail);
    this.Encrptresourcedetail(resource.Employee, encryresource.Employee);
    return this.apiService.put(this.getEmpApiUrl + 'UpdateDbRecord', encryresource);
  }
 
  GetErrorLog() {
    return this.apiService.get(this.getEmpApiUrl + 'GetErrorLog');
  }
  AddLog(errordetail) {
    return this.apiService.post(this.getEmpApiUrl + 'UpdateDbRecord', errordetail);
  }

  GetSalaryDetailAndEmploye(EmpId, SalaryDetailId): Observable<any> {

    return this.apiService.get(this.getsalary + 'GetSalaryDetailAndEmploye?EmpId=' + EmpId + "&SalaryDetailId=" + SalaryDetailId).pipe(map
      (data => {
        //this.objSalaryDetail=data.response;
        this.Decrptresourcedetail(data.response.Employee);
        if (data.response.SalaryDetail.BasicSalary != null) {
          this.Decrptsalarydetail(data.response.SalaryDetail);
          
        }
        return data;
      }));
  }

  GetTimeAndActivity(UserName) {
    return this.apiService.get(this.gettimeApiUrl + 'GetTimeAndActivity?Login=' + UserName);
  }
  GetEmployeeList() {
    return this.apiService.get(this.getEmpApiUrl + 'GetEmployeeList').
      pipe(map
        (data => {
          data.response.forEach(value => {
            this.Decrptsalarydetail(value);
            this.Decrptresourcedetail(value);
          });
          return data;
        }));
  }
  
  GetAllEmployee() {
    return this.apiService.get(this.getEmpApiUrl + 'GetAllEmployee');

  }

  GetAllExEmployee() {
    return this.apiService.get(this.getEmpApiUrl + 'GetAllExEmployee').  pipe(map
      (data => {
        data.response.forEach(value => {
          this.Decrptsalarydetail(value);
          this.Decrptresourcedetail(value);
        });
        return data;
      }));;
  }
  getEmployeeRecords(Id) {
    return this.apiService.get(this.getEmpApiUrl + 'GetEmployeeRecords?Id=' + Id);
  }

  ChangePassword(changePassword) {
    return this.apiService.post(this.getEmpApiUrl + 'ChangePassword', changePassword);
  }
  GetEmployeByUserName(UserName) {
    return this.apiService.get(this.getEmpApiUrl + 'GetEmployeByUserName?Login=' + UserName);
  }
  GetMyProfile(UserName) {
    return this.apiService.get(this.getEmpApiUrl + 'GetMyProfile?Login=' + UserName)
    .pipe(map
      (data => {
        //this.objSalaryDetail=data.response;
        this.Decrptresourcedetail(data.response)
        return data;
      }));
  }
  getDOBandAnniversaryOfMonth(date) {
    return this.apiService.get(this.getbdayApiUrl + 'getDOBandAnniversaryOfMonth?dateDOB=' + date)
  }
  GetMonthlyHoliday(date) {
    return this.apiService.get(this.getholidayApiUrl + 'GetMonthlyHoliday?RequestDate=' + date)
  }
  GetHolidayList() {
    return this.apiService.get(this.getholidayApiUrl + 'GetHolidayList')
  }
  GetHolidayListByYear(year) {
    return this.apiService.get(this.getholidayApiUrl + 'GetHolidayListByYear?year=' + year);
  }
  AddSalaryDetail(details) {
    var encryptedSalaryDetail = new EncryptedSalaryDetail();

    this.Encrptsalarydetail(details, encryptedSalaryDetail);
    return this.apiService.post(this.getsalary + 'AddSalaryDetail', encryptedSalaryDetail);

  }
  AddSalarySlip(details) {
    var encryptedSalarySlip = new EncryptedSalarySlip();
    this.Encrptsalaryslip(details, encryptedSalarySlip);
    return this.apiService.post(this.getsalary + 'AddSalarySlip', encryptedSalarySlip);
  }
  GetMedicalAndLTA() {
    return this.apiService.get(this.getsalary + 'GetMedicalAndLTA');
  }
  UpdateMedicalAndLTA(objmedicallta) {
    return this.apiService.put(this.getsalary + 'UpdateMedicalAndLTA', objmedicallta);
  }
  GetAllSalaryDetail() {
    return this.apiService.get(this.getsalary + 'GetAllSalaryDetail').
      pipe(map
        (data => {
          data.response.forEach(value => {
            this.Decrptsalarydetail(value)
          });
          return data;
        }));
  }

  SalaryslipDownloadCount(UserName) {
    return this.apiService.get(this.getsalary + 'SalaryslipDownloadCount?Login=' + UserName);
  }

  GetSalaryDetail(Id): Observable<any> {
    return this.apiService.get(this.getsalary + 'GetSalaryDetail?SalaryDetailId=' + Id)
      .pipe(map
        (data => {
          //this.objSalaryDetail=data.response;
          this.Decrptsalarydetail(data.response)
          return data;
        }));
  }
  GetSalarySlip(Id): Observable<any> {

    return this.apiService.get(this.getsalary + 'GetSalarySlip?SalarySlipId=' + Id).
      pipe(map
        (data => {
          //this.objSalaryDetail=data.response;
          this.Decrptsalaryslip(data.response)
          return data;
        }));
  }
  DeleteSalarySlip(Month, Year) {
    return this.apiService.delete(this.getsalary + 'DeleteSalarySlip?Month=' + Month + "&Year=" + Year);
  }

  DeleteSalarySlipBySalarySlipId(Month, Year, SalarySlipId) {
    return this.apiService.delete(this.getsalary + 'DeleteSalarySlipBySalarySlipId?Month=' + Month + "&Year=" + Year + "&SalarySlipId=" + SalarySlipId);
  }
  GetSalarySlipByUserId(Month, Year, EmpiId, TotalWorkingDay) {
    return this.apiService.get(this.getsalary + 'GetSalarySlipByUserId?Month=' + Month + "&Year=" + Year + '&UserId=' + EmpiId + '&TotalWorkingDay=' + TotalWorkingDay);

  }
  GetYearAndMonthApplyingPF() {
    return this.apiService.get(this.getsalary + 'GetYearAndMonthApplyingPF');
  }
  implementpf(pfmonth, pfyear, currenmonth, currentyear) {
    if ((pfmonth >= currenmonth && pfyear == currentyear) || (pfyear < currentyear)) {

      return true;
    }
    else {

      return false;
    }
  }
  UpdateSalaryDetail(details) {
    var encryptedSalaryDetail = new EncryptedSalaryDetail();
    this.Encrptsalarydetail(details, encryptedSalaryDetail);
    return this.apiService.put(this.getsalary + 'UpdateSalaryDetail', encryptedSalaryDetail);
  }

  GetAllSalarySlip(Month, Year, EmpiId, TotalWorkingDay) {
    return this.apiService.get(this.getsalary + 'GetAllSalarySlip?Month=' + Month + "&Year=" + Year + '&UserId=' + EmpiId + '&TotalWorkingDay=' + TotalWorkingDay)
      .pipe(map
        (data => {
          data.response.forEach(value => {
            if (data.response.length > 0) {
              this.Decrptsalaryslip(value);
            }
          });
          return data;
        }));
  }


  GetCurrentMonthYear() {
    return this.apiService.get(this.getsalary + 'GetCurrentMonthYear',);
  }
 
  GetSalarySlipbyEmpId(empid) {
    return this.apiService.get(this.getsalary + 'GetSalarySlipbyEmpId?EmpId=' + empid)
      .pipe(map
        (data => {

          data.response.forEach(value => {

            this.Decrptsalaryslip(value)
          });
          return data;
        }));
  }
  SaveEmplyeeSalarySlipPassword(username: string, password: string) {
    password = this.getencryptpwd(password, username);
    let data = { "UserName": username, "Password": password }
    return this.apiService.post(this.getsalary + 'SaveEmplyeeSalarySlipPassword', data);
  }
  GetEmployeeSalarySlipPassword() {
    return this.apiService.post(this.getsalary + 'GetEmployeeSalarySlipPassword');
  }
  GetEmpDetailForSalarySlip(SalarySlipId) {
    return this.apiService.get(this.getsalary + 'GetEmpDetailForSalarySlip?SalarySlipId=' + SalarySlipId).
      pipe(map
        (data => {
          this.Decrptsalaryslip(data.response);
          this.Decrptresourcedetail(data.response);
          return data;
        }));
  }

  UpdateSalarySlip(details) {
    var encryptedSalarySlip = new EncryptedSalarySlip();
    this.Encrptsalaryslip(details, encryptedSalarySlip);
    return this.apiService.put(this.getsalary + 'UpdateSalarySlip', encryptedSalarySlip);
  }
  GenerateSalarySlip(objmonthyear) {
    return this.apiService.post(this.getsalary + 'GenerateSalarySlip', objmonthyear);
  }
  PreviousMonthSalarySlipGenerated(objmonthyear){
    return this.apiService.get(this.getsalary + 'PreviousMonthSalarySlipGenerated?Month='+objmonthyear.Month+'&Year='+objmonthyear.Year);
  }
  DownloadSalary(Id, empid) {
    return this.apiService.get(this.getsalary + 'DownloadSalary?EmpId=' + empid + '&SalarySlipId=' + Id);
  }


  GetSalaryDetailByEmpId() {
    return this.apiService.get(this.getsalary + 'GetSalaryDetailByEmpId').
    pipe(map
      (data => {
        this.Decrptsalarydetail(data.response)
        return data;
      }));
  }

  
  DownloadFile(Id, empid) {
    return this.apiService.getDownloadFile(this.getsalary + 'DownloadSalary?EmpId=' + empid + '&SalarySlipId=' + Id)
  }
  getencryptpwd(value, LoginName) {
    var Password = this.EncrDecrService.securityEncrypt(value, LoginName);
    return Password;
  }
  Encrptsalarydetail(details, encryptedSalaryDetail) {
    encryptedSalaryDetail.EmpId = details.EmpId;
    encryptedSalaryDetail.EmpName = details.EmpName;
    encryptedSalaryDetail.UserId = details.UserId;
    encryptedSalaryDetail.LTA = details.LTA;
    encryptedSalaryDetail.Medical = details.Medical;
    encryptedSalaryDetail.SalaryDetailId = details.SalaryDetailId;
    encryptedSalaryDetail.BasicSalary = this.EncrDecrService.Encrypt(details.BasicSalary);
    encryptedSalaryDetail.HRA = this.EncrDecrService.Encrypt(details.HRA);
    encryptedSalaryDetail.SpecialAllowence = this.EncrDecrService.Encrypt(details.SpecialAllowence);
    encryptedSalaryDetail.TDSDeducton = this.EncrDecrService.Encrypt(details.TDSDeducton);
    encryptedSalaryDetail.TotalPaybleSalary = this.EncrDecrService.Encrypt(details.TotalPaybleSalary);
    encryptedSalaryDetail.PFAmount = this.EncrDecrService.Encrypt(details.PFAmount);
    encryptedSalaryDetail.Gratuity = this.EncrDecrService.Encrypt(details.Gratuity);
  }


  Encrptresourcedetail(details, encryptedresourceDetail) {
    encryptedresourceDetail.AlternativeContactNo = details.AlternativeContactNo;
    encryptedresourceDetail.AlternativeEmail = details.AlternativeEmail;
    encryptedresourceDetail.Anniversary = details.Anniversary;
    encryptedresourceDetail.BankName = details.BankName;
    encryptedresourceDetail.BasicSalary = details.BasicSalary;
    encryptedresourceDetail.ContactNo = details.ContactNo;
    encryptedresourceDetail.CreatedOn = details.CreatedOn;
    encryptedresourceDetail.CurrentSalary = details.CurrentSalary;
    encryptedresourceDetail.DateOfBirth = details.DateOfBirth;
    encryptedresourceDetail.DateOfJoining = details.DateOfJoining;
    encryptedresourceDetail.DateOfSeparation = details.DateOfSeparation;
    encryptedresourceDetail.Department = details.Department;
    encryptedresourceDetail.DepartmentID = details.DepartmentID;
    encryptedresourceDetail.DepartmentName = details.DepartmentName;
    encryptedresourceDetail.Designation = details.Designation;
    encryptedresourceDetail.DesignationID = details.DesignationID;
    encryptedresourceDetail.DesignationName = details.DesignationName;
    encryptedresourceDetail.Email = details.Email;
    encryptedresourceDetail.EmployeeID = details.EmployeeID;
    encryptedresourceDetail.ExtensionNo = details.ExtensionNo;
    encryptedresourceDetail.ExtensionNo_STD = details.ExtensionNo_STD;
    encryptedresourceDetail.FatherName = details.FatherName;
    encryptedresourceDetail.FirstName = details.FirstName;
    encryptedresourceDetail.Gender = details.Gender;
    encryptedresourceDetail.HRA = details.HRA;
    encryptedresourceDetail.HRName = details.HRName;
    encryptedresourceDetail.HrId = details.HrId;
    encryptedresourceDetail.ID = details.ID;
    encryptedresourceDetail.ImageName = details.ImageName;
    encryptedresourceDetail.IsActive = details.IsActive;
    encryptedresourceDetail.IsActiveNew = details.IsActiveNew;
    encryptedresourceDetail.IsMailRequired = details.IsMailRequired;
    encryptedresourceDetail.IsManager = details.IsManager;
    encryptedresourceDetail.IsManagerNew = details.IsManagerNew;
    encryptedresourceDetail.IsProbation = details.IsProbation;
    encryptedresourceDetail.IsProbationNew = details.IsProbationNew;
    encryptedresourceDetail.LTA = details.LTA;
    encryptedresourceDetail.Location = details.Location;
    encryptedresourceDetail.LocationID = details.LocationID;
    encryptedresourceDetail.Login = details.Login;
    encryptedresourceDetail.Manager = details.Manager;
    encryptedresourceDetail.ManagerID = details.ManagerID;
    encryptedresourceDetail.MaritalStatus = details.MaritalStatus;
    encryptedresourceDetail.Medical = details.Medical;
    encryptedresourceDetail.PFAmount = details.PFAmount;
    encryptedresourceDetail.PermanentAddress = details.PermanentAddress;
    encryptedresourceDetail.PresentAddress = details.PresentAddress;
    encryptedresourceDetail.ProjectManager = details.ProjectManager;
    encryptedresourceDetail.Qualification = details.Qualification;
    encryptedresourceDetail.RManager = details.RManager;
    encryptedresourceDetail.ReportingPerson = details.ReportingPerson;
    encryptedresourceDetail.ReportingPersonID = details.ReportingPersonID;
    encryptedresourceDetail.SalaryDetailId = details.SalaryDetailId;
    encryptedresourceDetail.SpecialAllowence = details.SpecialAllowence;
    encryptedresourceDetail.TDSDeducton = details.TDSDeducton;
    encryptedresourceDetail.TotalPaybleSalary = details.TotalPaybleSalary;
    encryptedresourceDetail.TotalWorkExperience = details.TotalWorkExperience;
    encryptedresourceDetail.UniqueId = details.UniqueId;
    encryptedresourceDetail.UpdatedOn = details.UpdatedOn;
    if (details.PanCard ) {
    encryptedresourceDetail.PanCard = this.EncrDecrService.Encrypt(details.PanCard);
  }
  if (details.UANNO) {
    encryptedresourceDetail.UANNO = this.EncrDecrService.Encrypt(details.UANNO);
  }
  if (details.PFNO ) {
    encryptedresourceDetail.PFNO = this.EncrDecrService.Encrypt(details.PFNO);
  }
  if (details.ESINO ) {
    encryptedresourceDetail.ESINO = this.EncrDecrService.Encrypt(details.ESINO);
  }
  if (details.AadharCard ) {
    encryptedresourceDetail.AadharCard = this.EncrDecrService.Encrypt(details.AadharCard);
  }
  if(details.BankAccountNo){
    encryptedresourceDetail.BankAccountNo = this.EncrDecrService.Encrypt(details.BankAccountNo);
  }
  }

  Decrptresourcedetail(details) {
    if (details.PANCardNo ) {
      details.PANCardNo = this.EncrDecrService.Decrypt(details.PANCardNo);
    }
    if (details.PanCard ) {
      details.PanCard = this.EncrDecrService.Decrypt(details.PanCard);
    }
    if (details.UANNO) {
      details.UANNO = this.EncrDecrService.Decrypt(details.UANNO);
    }
    if (details.PFNO ) {
      details.PFNO = this.EncrDecrService.Decrypt(details.PFNO);
    }
    if (details.ESINO ) {
      details.ESINO = this.EncrDecrService.Decrypt(details.ESINO);
    }
    if (details.AadharCard ) {
      details.AadharCard = this.EncrDecrService.Decrypt(details.AadharCard);
    }
    if (details.BankAccountNo) {
      details.BankAccountNo = this.EncrDecrService.Decrypt(details.BankAccountNo);
    }
  }

  Decrptsalarydetail(details) {
    details.BasicSalary = this.EncrDecrService.Decrypt(details.BasicSalary);
    details.HRA = this.EncrDecrService.Decrypt(details.HRA);
    details.SpecialAllowence = this.EncrDecrService.Decrypt(details.SpecialAllowence);
    details.TDSDeducton = this.EncrDecrService.Decrypt(details.TDSDeducton);
    details.TotalPaybleSalary = this.EncrDecrService.Decrypt(details.TotalPaybleSalary);
    if (details.PFAmount == null) {
      details.PFAmount = 0;
    }
    else {
      details.PFAmount = parseFloat(this.EncrDecrService.Decrypt(details.PFAmount));
    }
    if (details.Gratuity == null) {
      details.Gratuity = 0;
    }
    else {
      details.Gratuity = parseFloat(this.EncrDecrService.Decrypt(details.Gratuity));
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
    encryptedSalarySlip.BasicSalary = this.EncrDecrService.Encrypt(details.BasicSalary);
    encryptedSalarySlip.HRA = this.EncrDecrService.Encrypt(details.HRA);
    encryptedSalarySlip.OtherSpecialAllowence = this.EncrDecrService.Encrypt(details.OtherSpecialAllowence);
    encryptedSalarySlip.TaxDeductionPM = this.EncrDecrService.Encrypt(details.TaxDeductionPM);
    encryptedSalarySlip.TotalPaybleSalary = this.EncrDecrService.Encrypt(details.TotalPaybleSalary);
    encryptedSalarySlip.PFAmount = this.EncrDecrService.Encrypt(details.PFAmount);
    encryptedSalarySlip.Gratuity = this.EncrDecrService.Encrypt(details.Gratuity);
    encryptedSalarySlip.LeaveDeduction = this.EncrDecrService.Encrypt(details.LeaveDeduction);
    encryptedSalarySlip.TotalSalaryPM = this.EncrDecrService.Encrypt(details.TotalSalaryPM);
    encryptedSalarySlip.Incentives = this.EncrDecrService.Encrypt(details.Incentives);
    encryptedSalarySlip.OtherDeduction = this.EncrDecrService.Encrypt(details.OtherDeduction);
    encryptedSalarySlip.MonthlySalary = this.EncrDecrService.Encrypt(details.MonthlySalary);
  }

  Decrptsalaryslip(details) {
    details.BasicSalary = parseFloat(this.EncrDecrService.Decrypt(details.BasicSalary));
    details.HRA = parseFloat(this.EncrDecrService.Decrypt(details.HRA));
    details.OtherSpecialAllowence = parseFloat(this.EncrDecrService.Decrypt(details.OtherSpecialAllowence));
    details.TaxDeductionPM = parseFloat(this.EncrDecrService.Decrypt(details.TaxDeductionPM));
    details.TotalPaybleSalary = parseFloat(this.EncrDecrService.Decrypt(details.TotalPaybleSalary));
    if (details.PFAmount == null) {
      details.PFAmount = 0;
    }
    else {
      details.PFAmount = parseFloat(this.EncrDecrService.Decrypt(details.PFAmount));
    }
    if (details.Gratuity == null) {
      details.Gratuity = 0;
    }
    else {
      details.Gratuity = parseFloat(this.EncrDecrService.Decrypt(details.Gratuity));
    }
    if (details.LeaveDeduction == null) {
      details.LeaveDeduction = 0
    }
    else {
      details.LeaveDeduction = parseFloat(this.EncrDecrService.Decrypt(details.LeaveDeduction));
    }
    details.TotalSalaryPM = parseFloat(this.EncrDecrService.Decrypt(details.TotalSalaryPM));
    if (details.Incentives == null) {
      details.Incentives = 0;
    }
    else {
      details.Incentives = parseFloat(this.EncrDecrService.Decrypt(details.Incentives));
    }
    if (details.OtherDeduction == null) {
      details.OtherDeduction = 0;
    }
    else {
      details.OtherDeduction = parseFloat(this.EncrDecrService.Decrypt(details.OtherDeduction));
    }
    if (details.MonthlySalary == null) {
      details.MonthlySalary = 0;
    }
    else {
      details.MonthlySalary = parseFloat(this.EncrDecrService.Decrypt(details.MonthlySalary));
    }
  } 
  GetManagersList() {
    return this.apiService.get(this.getEmpApiUrl + 'GetManagersList');
  }
 GetResourcesByManagerId(id){
  return this.apiService.get(this.getEmpApiUrl + 'GetResourcesByManagerId?ManagerId=' + id);
 }
 GetResourcesByReportingManagerId(id){
  return this.apiService.get(this.getEmpApiUrl + 'GetResourcesByReportingManagerId?ReportingManagerId=' + id);
 }
UpdateResourceManager(objResourceManager){
  return this.apiService.put(this.getEmpApiUrl + 'UpdateResourceManager', objResourceManager);
}
UpdateResourceReportingManager(objResourceManager){
  return this.apiService.put(this.getEmpApiUrl + 'UpdateResourceReportingManager', objResourceManager);
}
GetAllManager(){
  return this.apiService.get(this.getEmpApiUrl + 'GetAllManager');
}
GetAllReportingEmployee(){
  return this.apiService.get(this.getEmpApiUrl + 'GetAllReportingEmployee');
}
}



