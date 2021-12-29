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
  errorMsg ='';
  redirectUrl: string;
  userLogin: Login = new Login();
  errormsg = {
    // name: [
    //   {
    //     type: 'required',
    //     message: 'Provide name.'
    //   },
    //   {
    //     type: 'pattern',
    //     message: 'name is not valid.'
    //   }
    // ],
    // password: [
    //   {
    //     type: 'required',
    //     message: 'Password is required.'
    //   },
    //   {
    //     type: 'minlength',
    //     message: 'Password length should be 6 characters long.'
    //   }
    // ]
  };

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
      UserEmail: new FormControl('', Validators.compose([
        Validators.required,
        //Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      Password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

   signIn(value) {
    this.authService.LoginUser(this.userLogin.UserEmail,this.userLogin.Password).subscribe(token => {
      if (token.StatusCode === 200) {
        token.response._UserDetail.UserName = this.userLogin.UserEmail;
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
        //this.errormsg = 'Something went Wrong';
      }
      else {
        //this.errormsg = 'Username or password is incorrect.';
      }
    },
      err => this.errormsg = err
    );


    }
  }

