import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse} from "@angular/common/http";
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class ApiInterceptorService {

  constructor(private authenticationService: AuthenticationService,
    public toastrService:ToastrService,
    public _spinner: SpinnerService,
    public router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
      this._spinner.loader.next(true);
        request = request.clone({
          setHeaders: {
            UserName:this.authenticationService.UserName,
            Authorization: `Bearer ${this.authenticationService.getAccessToken()}`
          }
        });    
        return next.handle(request).pipe(
          tap(
            (data) => {
              if (data instanceof HttpResponse) {
                this._spinner.loader.next(false);
              }
            },
            (err: any) => {
              this._spinner.loader.next(false);
              if (err instanceof HttpErrorResponse) {
                if ([403].indexOf(err.status) !== -1) { 
                  this.authenticationService.removeToken();
                  this.router.navigate(['/login']);
                }
                else if ([401].indexOf(err.status) !== -1) { 
                  this.router.navigate(['/notauthorised']);
                }
                else if(err.status===0){
                  this.toastrService.warning(' No Internet Connection. ');
                }
               
              }
            }
          ))
      }
}
