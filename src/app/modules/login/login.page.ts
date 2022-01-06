import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Login } from './login';
import { Resource } from '../../modals/resource';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  employee: Array<Resource>;
  userForm: FormGroup;
  successMsg = '';
  errormsg: string = '';
  redirectUrl: string;
  userLogin: Login = new Login();
  isSubmitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.redirectUrl = this.route.snapshot.queryParams.returnUrl;
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      UserName: new FormControl('', Validators.compose([
        Validators.required,
        //Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      Password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }
  get f() {
    return this.userForm.controls;
  }
   signIn(value) {
    this.isSubmitted = true;
    if (!this.userForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
    this.authService.LoginUser(this.userLogin.UserName,this.userLogin.Password).subscribe(token => {
      if (token.StatusCode === 200) {
        token.response._UserDetail.UserName = this.userLogin.UserName;
        token.response._UserDetail.Access_token = token.response.Access_token;
        this.authService.setToken(token.response);
        this.authService.setloggedIn();
        this.authService.setName(token.response._UserDetail.Name);
        if (token.response._UserDetail.IsHrManager === 'True') {
          this.authService.setHrManager(true);
        }
        else {
          this.authService.setHrManager(false);
        }
        if (token.response._UserDetail.IsManager === 'True') {
          this.authService.setManager(true);
        }
        else {
          this.authService.setManager(true);
        }
        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);
          this.redirectUrl = null;
        }
        else {
          this.router.navigate(['dashboard']);
        }
      }
      else if (token.StatusCode === 405) {
        this.errormsg = 'Something went Wrong';
      }
      else {
        this.errormsg = 'Username or password is incorrect.';
      }
    },

      err => this.errormsg = err
    );
  }


    }
    submitForm() {
      this.isSubmitted = true;
      if (!this.userForm.valid) {
        console.log('Please provide all the required values!')
        return false;
      } else {
        console.log(this.userForm.value)
      }
    }
  }

