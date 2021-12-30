import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../core/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private baseUrl = environment.baseUrl;
  private getEmpApiUrl = this.baseUrl + 'api/Employee/';
  public resource: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    constructor(private apiService: ApiService) { 
        if(location.hostname.indexOf("192.168.1.")>=0)
        {
        this.baseUrl=environment.localbaseUrl;
        this.getEmpApiUrl=this.baseUrl + 'api/Leaves/';
        }
    }
    GetResourceName(UserData) {
      return this.apiService.get(this.getEmpApiUrl + 'GetResourceName?Login=' + UserData);
    }
}
