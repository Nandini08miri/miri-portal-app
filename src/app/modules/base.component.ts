import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { AppInjectorService } from '../core/services/app-injector.service';
import { AuthenticationService } from '../core/services/authentication.service';
import { environment } from 'src/environments/environment';
// import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../modules/shared/shared.service';
@Component({
  selector: 'app-base',
  template:'<p> base component </p>'
})

export class BaseComponent implements OnInit {
  protected dataloaded:boolean=true;
  protected router: Router;
  public location: Location;
  protected authservice:AuthenticationService;
  protected baseUrl = environment.baseUrl;
  // protected toastrService:ToastrService;
  protected loginUserData;
  protected sharedservice: SharedService;
  constructor() { 
    const injector = AppInjectorService.getInjector();
    this.router = injector.get(Router);
    this.location = injector.get(Location);
    this.authservice=injector.get(AuthenticationService);
    this.sharedservice=injector.get(SharedService);
    // this.toastrService=injector.get(ToastrService);
    this.loginUserData=this.authservice.UserData.value;  
  }

  ngOnInit() {
  }
 
}
