import { Injectable, ɵConsole } from '@angular/core';
import {Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { EncrDecrService } from '../services/encr-decr.service';
import { environment } from '../../../environments/environment';
import{ApiService} from './api.service';
@Injectable({
  providedIn:'root'
})
export class AuthenticationService {
  tokendata = null;
  tokenKey: string = "usertrackingtoken";
  public UserData = new BehaviorSubject<any>(null);
  public baseUrl = environment.baseUrl;
  public noauth : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private getloginApiUrl =  this.baseUrl + 'api/LoginUser/';
  private name: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public ErrorMsg: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isManager: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isHrManager: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  location: Location;
  constructor(private router: Router, private apiService: ApiService,private encrDecrService: EncrDecrService) {

    if(window.location.href.indexOf("192.168.1.")>=0)
    {
      this.baseUrl=environment.localbaseUrl;
      this.getloginApiUrl =  this.baseUrl + 'api/LoginUser/';
    }

    var token = this.decryptoken();
      if(token!=null)
      {
        this.UserData.next(token);
      }
  }

  get isLoggedIn() {
      let token = this.getdata('UserName');
      if (token != null) {
          this.loggedIn.next(true);
      }
      return this.loggedIn.asObservable();
  }

  get UserName() {
    let userName= this.getdata('UserName');
    return userName;
  }
  get Email() {
    let email= this.getdata('Email');
    return email;
  }
  get Name(): string {
    this.name.next(this.getdata('Name'));
   return this.name.value;

  }

  get Id() {
    let id = this.getdata('Id') ;
    return id;
  }

getdata(field)
{
  let token=this.decryptoken();
  let data="";
  if(token)
  {
   data=token[field];
  }
  return data;
}

decryptoken(){
 let token=localStorage.getItem(this.tokenKey);
 var decryptdata=null;
 if (this.tokendata == null && token !=null) {
  decryptdata=this.encrDecrService.Decrypt(token);
  decryptdata=this.tokendata=JSON.parse(decryptdata);
 }
 else if (this.tokendata !== null )
 {
  decryptdata=this.tokendata ;
 }

 return decryptdata;
}

  get Deparment() {
    let depart =  this.getdata('DepartmentID');
    return depart;
  }

  getAccessToken() {
    let access_token =this.getdata('Access_token');
    return access_token;
  }

  isAuthenticated(): boolean {
    let token = this.decryptoken();
    if (token) {
      return true;
    }
    else {
      return false;
    }
  }

  get IsManager() {
    let token = this.getdata('IsManager');
    if (token) {
        if (token === 'True') {
            this.isManager.next(true);
        }
        else {
            this.isManager.next(false);
        }
    }
    return this.isManager.asObservable();
}

  get IsHrManager() {
    let token = this.getdata('IsHrManager');
    if (token) {
        if (token === 'True') {
            this.isHrManager.next(true);
        }
        else {
            this.isHrManager.next(false);
        }
    }
    return this.isHrManager.asObservable();
}

getHrManager(){
  return this.isHrManager.asObservable();
}

    setloggedIn() {
        this.loggedIn.next(true);
    }
    setName(name) {
        this.name.next(name);
    }

    setHrManager(isHrManager) {
        this.isHrManager.next(isHrManager);
    }

    setManager(isManager) {
        this.isManager.next(isManager);
    }

    trim(data) {
      for (const item in data) {
          if (typeof data[item] === 'string') {
              data[item] = data[item].trim();
          }
      }
      return data;
  }

  LoginUser(username: string, password: string): Observable<any> {
   let data={"UserName":username,"Password":password}
   data=this.trim(data);
    return this.apiService.post(this.getloginApiUrl + 'Validateuser',data);
  }

  ForgotPwd(UserName): Observable<any> {
    let data={"UserName":UserName}
    data=this.trim(data);
     return this.apiService.post(this.getloginApiUrl + 'ForgotPwd?UserName=' + UserName);
   }

  logout() {
    this.removeToken();
    this.name.next("");
    this.router.navigate(['login']);
  }

  setToken(token) {
    this.tokendata=token._UserDetail;
    this.UserData.next(token._UserDetail);
    var userdata= this.encrDecrService.Encrypt(JSON.stringify(token._UserDetail));
    localStorage.setItem(this.tokenKey,userdata);
  }

  removeToken() {
    this.tokendata=null;
    this.UserData.next(null);
    localStorage.clear();
    sessionStorage.clear();
    localStorage.removeItem(this.tokenKey);
  }

}
