import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SecurityService } from '../_services/security.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
		private securityService: SecurityService,
		private userService: UserService,
	  	private cookieService: CookieService, 
		private router: Router
	  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.securityService.login(username, password).subscribe({
      next: data => {
		this.isLoginFailed = false;
		this.isLoggedIn = true;
		this.redirectToHome();
      },
      error: err => {
		  debugger;
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  redirectToHome(): void {
	this.router.navigate(['./home']);
  }
}
