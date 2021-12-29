import { Injectable } from '@angular/core';
import { AuthenticationService } from '../core/services/authentication.service';
import { Router,RouterStateSnapshot,CanActivate ,ActivatedRouteSnapshot,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthenticationService, private router: Router,private route: ActivatedRoute) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { 
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});        
            return false;
        }
        return true;
       
    }
}
