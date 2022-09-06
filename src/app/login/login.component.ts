import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SecurityService } from '../_services/security.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

import { OktaAuthService } from '@okta/okta-angular';

// @ts-ignore
import * as OktaSignIn from '@okta/okta-signin-widget';
import appConfig from '../config/dev.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  oktaSignin: any;

  constructor(
		private securityService: SecurityService,
		private userService: UserService,
	  	private cookieService: CookieService, 
		private router: Router,
		private oktaAuthService: OktaAuthService
	  ) { 

		this.oktaSignin = new OktaSignIn({
			logo: 'assets/logo-transparent.png',
			baseUrl: appConfig.oidc.issuer.split('/oauth2')[0],
			clientId: appConfig.oidc.clientId,
			redirectUri: appConfig.oidc.redirectUri,
			authParams: {
			  pkce: true,
			  issuer: appConfig.oidc.issuer,
			  scopes: appConfig.oidc.scopes
			}
		  });
	  }

  ngOnInit(): void {
	this.oktaSignin.renderEl({ el: '#okta-sign-in-widget'},
	(response: any) => {
	  if(response.status === 'SUCCESS'){
		this.oktaAuthService.signInWithRedirect();
	  }
	},
	(error: any) => {
	  throw error;
	});
  }

  ngOnDestroy(): void {
	this.oktaSignin.remove();
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
