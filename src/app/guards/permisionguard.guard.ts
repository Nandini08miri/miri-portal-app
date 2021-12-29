import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../core/services/authentication.service';
@Injectable({
  providedIn: 'root'
})

export class PermisionguardGuard implements CanActivate {
  public userData;
  constructor(public route: Router,private authenticationService:AuthenticationService) { 
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.userData = this.authenticationService.decryptoken();
      if(this.userData._UserDetail.DepartmentID == "5" || this.userData._UserDetail.IsHrManager === 'True') {
        return true;
      }
      this.route.navigate(['/notauthorised']);
      return false;
  }
  
}
