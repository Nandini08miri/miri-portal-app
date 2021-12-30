import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class LeaveService {
    private baseUrl = environment.baseUrl;
    private getleaveApiUrl = this.baseUrl + 'api/Leaves/';
    private getApiUrl = '';
    constructor(private apiService: ApiService) { 
        if(location.hostname.indexOf("192.168.1.")>=0)
        {
        this.baseUrl=environment.localbaseUrl;
        this.getleaveApiUrl=this.baseUrl + 'api/Leaves/';
        }
    }

    getLeaveBalance(login): Observable<any> {
        return this.apiService.post(this.getleaveApiUrl + 'GetLeaveBalance', login);
    }
    GetLeaveBalance(Login): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetLeaveBalance?Login=' + Login);
    }
    GetResourceName(login): Observable<any> {
        return this.apiService.get(this.baseUrl + 'api/Employee/GetResourceName?Login=' + login);
    }
    getYear(): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetYear');
    }
    getLeaveType(login): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetLeaveType?login=' + login);
    }
    getAppliedLeaveDetail(ResourceId, LeaveTypeId, StatusID, dateFrom, dateTo, Pagename): Observable<any> {
        return this.apiService.get(this.baseUrl + 'api/LeaveReport/GetAppliedLeaveDetail?ResourceId=' + ResourceId + '&LeaveTypeId=' + LeaveTypeId + '&StatusID=' + StatusID + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo + '&Pagename=' + Pagename);
    }
    InsertLeaveDetails(EmpId, ReasonForLeave, LeaveTypeId, LeaveType, TotalNoOfDays, LeaveId, RMID, TMId, UserName, UserEmail, MailToEmail, MailToName, LeaveDetailItems): Observable<any> {
        return this.apiService.post(this.getleaveApiUrl + 'InsertLeaveDetails?EmpId=' + EmpId + '&ReasonForLeave=' + ReasonForLeave + '&LeaveTypeId=' + LeaveTypeId + '&LeaveType=' + LeaveType + '&TotalNoOfDays=' + TotalNoOfDays + '&LeaveId=' + LeaveId + '&RMID=' + RMID + '&TMId=' + TMId + '&UserName=' + UserName + '&UserEmail=' + UserEmail + '&MailToEmail=' + MailToEmail + '&MailToName=' + MailToName, LeaveDetailItems);
    }
    getLeaveBalanceById(login, leaveTypeId): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetLeaveBalanceById?login=' + login + '&leaveTypeId=' + leaveTypeId);
    }
    leaveDetailCheck(): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'LeaveDetailCheck');
    }
    getManagerDetails(login): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetManagerDetails?login=' + login);
    }
    checkLeaveDetailsNew(leaveDetailsXmlData, leaveDetailsCurrentData, Login, LeaveId): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'CheckLeaveDetailsNew?login=' + Login + '&LeaveId=' + LeaveId + '&leaveDetailsXmlData=' + leaveDetailsXmlData + '&leaveDetailsCurrentData=' + leaveDetailsCurrentData);
    }
    checkCancelLeaveDetails(DateFrom, DateTo, Login, LeaveTypeId): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'CheckCancelLeaveDetails?login=' + Login + '&LeaveTypeId=' + LeaveTypeId + '&DateTo=' + DateTo + '&DateFrom=' + DateFrom);
    }
    insertLeaveDetails(): Observable<any> {
        return this.apiService.post(this.getleaveApiUrl + 'InsertLeaveDetails');
    }
    getLeaveRecord(leaveId): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetLeaveRecord?leaveId=' + leaveId);
    }
    GetLeaveRecordForWFHByLeaveId(leaveId): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetLeaveRecordForWFHByLeaveId?leaveId=' + leaveId);
    }
    getLeaveApprovalId(LeaveId): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetLeaveApprovalId?leaveId=' + LeaveId);
    }
    getLeaveCancelApprovalId(LeaveId, CancelId): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetLeaveBalanceById?CancelId=' + CancelId + '&LeaveId=' + LeaveId);
    }
    getWorkFromHomeAndCompOffApprovalId(LeaveId): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetWorkFromHomeAndCompOffApprovalId+leaveId=', LeaveId);
    }
    getAllLeaveRecords(empname): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetAllLeaveRecords?empname=', empname);
    }
    getAllPendingLeaveByApproverName(Login): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetAllPendingLeaveByApproverName?Login=' + Login);
    }
    updateLeaveDetails(leaveId, approvalDate, ApprovalId, newApprovalStatus, ApprovalComments, LoginName, EmployeeLists): Observable<any> {
        return this.apiService.put(this.getleaveApiUrl + 'UpdateLeaveDetails?leaveId=' + leaveId + '&approvalDate=' + approvalDate + '&ApprovalId=' + ApprovalId + '&newApprovalStatus=' + newApprovalStatus + '&ApprovalComments=' + ApprovalComments + '&LoginName=' + LoginName , EmployeeLists);
        // return this.apiService.put(this.getleaveApiUrl+'UpdateLeaveDetails', { leaveId: leaveId, approvalDate: approvalDate, ApprovalId: ApprovalId, newApprovalStatus: newApprovalStatus, ApprovalComments: ApprovalComments, LoginName: LoginName, EmployeeLists: EmployeeLists });
    }
    getCancelLeaveRecord(CancelId): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetCancelLeaveRecord?CancelId=' + CancelId);
    }
    getCancelWFHLeaveRecord(CancelId): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetCancelWFHLeaveRecord?CancelId=' + CancelId);
    }
    updateCancelLeaveRecords(LoginName, EmpId, LeaveId, CancelFromDate, CancelToDate, CancelHalfDay, CancelNoOfDays, CancelId, LeaveTypeId, LeaveTypeName, TMID, HRId, CancelType): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'UpdateCancelLeaveRecords?LoginName=' + LoginName + '&LeaveId=' + LeaveId + '&EmpId=' + EmpId + '&CancelId=' + CancelId + '&LeaveTypeName=' + LeaveTypeName + '&HRId=' + HRId + '&CancelType=' + CancelType + '&TMID=' + TMID + '&LeaveTypeId=' + LeaveTypeId + '&CancelNoOfDays=' + CancelNoOfDays + '&CancelHalfDay=' + CancelHalfDay + '&CancelToDate=' + CancelToDate + '&CancelFromDate=' + CancelFromDate);
    }
    listOfApprovedUserLeavesForCancel(Login): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'ListOfApprovedUserLeavesForCancel?Login=' + Login);
    }
    listOfApprovedUserWFHLeavesForCancel(Login): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'ListOfApprovedUserWFHLeavesForCancel?Login=' + Login);
    }
    cancelLeaveApproval(DateFrom, DateTo, LeaveTypeName, NoOfDays, HalfDay, LeaveId, CancelId, approvalDate, ApprovalId, newApprovalStatus, ApprovalComments, LoginName, CancelType): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'CancelLeaveApproval?LoginName=' + LoginName + '&DateTo=' + DateTo + '&LeaveId=' + LeaveId + '&DateFrom=' + DateFrom + '&CancelId=' + CancelId + '&LeaveTypeName=' + LeaveTypeName + '&ApprovalComments=' + ApprovalComments + '&CancelType=' + CancelType + '&newApprovalStatus=' + newApprovalStatus + '&ApprovalId=' + ApprovalId + '&NoOfDays=' + NoOfDays + '&approvalDate=' + approvalDate + '&HalfDay=' + HalfDay);
    }
    getLeaveRecordForWFH(leaveId): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetLeaveRecordForWFHByLeaveId?leaveId=' + leaveId);
    }
    //EmpId, dateFrom, dateTo, ReasonForLeave, LeaveTypeId, LeaveTypeName, HalfDay, LeaveId, NoOfDays, TMID, HRId, LoginName
    insertWFHCompOffDetails(employeeidLeaveDetail): Observable<any> {
        return this.apiService.post(this.getleaveApiUrl + 'InsertWFHCompOffDetails', employeeidLeaveDetail);
    }
    updateWFHForApproval(DateFrom, DateTo, LeaveTypeName, NoOfDays, HalfDay, LeaveId, approvalDate, ApprovalId, newApprovalStatus, ApprovalComments, LoginName): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'UpdateWFHForApproval?LoginName=' + LoginName + '&DateTo=' + DateTo + '&LeaveId=' + LeaveId + '&DateFrom=' + DateFrom + '&LeaveTypeName=' + LeaveTypeName + '&ApprovalComments=' + ApprovalComments + '&newApprovalStatus=' + newApprovalStatus + '&ApprovalId=' + ApprovalId + '&NoOfDays=' + NoOfDays + '&approvalDate=' + approvalDate + '&HalfDay=' + HalfDay);
    }
    checkWFHCompOffDetails(DateFrom, DateTo, EmpId, LeaveTypeId): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'CheckWFHCompOffDetails?EmpId=' + EmpId + '&DateTo=' + DateTo + '&DateFrom=' + DateFrom + '&LeaveTypeId=' + LeaveTypeId);
    }
    checkWFHCompOffDetail(FromDate, ToDate, EmpId, LeaveTypeId): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'CheckWFHCompOffDetail?EmpId=' + EmpId + '&FromDate=' + FromDate + '&ToDate=' + ToDate + '&LeaveTypeId=' + LeaveTypeId);
    }
    getAllEmployeeOnLeave(data): Observable<any> {
        return this.apiService.post(this.getleaveApiUrl + 'GetAllEmployeeOnLeave',data);
    }
    GetEmployeeOnLeaveInWeek(data): Observable<any> {
        return this.apiService.post(this.getleaveApiUrl + 'GetEmployeeOnLeaveInWeek',data);
    }
   
    updateAllSelectedEmployeLeaveDetail(PersonName, ApprovalDate, PersonComment, SelectedLeaveDetail, Status): Observable<any> {
        return this.apiService.put(this.getleaveApiUrl + 'UpdateAllSelectedEmployeLeaveDetail?PersonName=' + PersonName + '&ApprovalDate=' + ApprovalDate + '&PersonComment=' + PersonComment + '&Status=' + Status,SelectedLeaveDetail );
    }
    getAllMultiplePendingLeaveByApproverName(Login): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetAllMultiplePendingLeaveByApproverName?Login=' + Login);
    }
    getAllUserLeaveBalance(Login): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetAllUserLeaveBalance?Login=' + Login);
    }
    getAllUserLeaveBalance1(login, year, month): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetAllUserLeaveBalance1?login=' + login + '&year=' + year + '&month=' + month);
    }
    getAllLeaveBalanceByID(Id): Observable<any> {
        return this.apiService.get(this.getleaveApiUrl + 'GetAllLeaveBalanceByID?Id=' + Id);
    }
    updateDbRecord(obj, ResourceID): Observable<any> {
        return this.apiService.post(this.getleaveApiUrl + 'UpdateDbRecord?ResourceID=' + ResourceID, obj);
    }
}
