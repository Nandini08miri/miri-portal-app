import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../enum/role.enum';
import { AuthenticationService } from '../core/services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class RoleguardGuard implements CanActivate {

  public userData;
  constructor(public router: Router,private authenticationService:AuthenticationService) {
    
  }
  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.userData = this.authenticationService.decryptoken();
      if( route.data.roles) {

        if( route.data.roles.indexOf(Role.HR) > -1 && this.userData.IsHrManager === 'True') {
        return true;
        }
        
        if (route.data.roles.indexOf(Role.Manager) > -1 && this.userData.IsManager === 'True') {
        return true;
        }
        if (route.data.roles.indexOf(Role.Account) > -1 && this.userData.DepartmentID == "5") {
          return true;
          }
          if (route.data.roles.indexOf(Role.Admin) > -1 && this.userData.DesignationID== "57") {
            return true;
            }
  
          
        this.router.navigate(['/notauthorised']);
        return false;
        
        }
        else
        {
        return false;
        }
    }
}
