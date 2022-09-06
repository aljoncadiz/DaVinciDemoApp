import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { cookieInterceptorProviders } from './_helpers/cookie.interceptor';
import { Router } from '@angular/router';

import myAppConfig from './config/dev.config';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';

const oktaConfig = Object.assign({
	onAuthRequired: (oktaAuth: any, injector: Injector) => {
	   const router = injector.get(Router);
	   router.navigate(['/login']);
	}
  }, myAppConfig.oidc)
  
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	OktaAuthModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
	  {provide: OKTA_CONFIG, useValue: oktaConfig},
	  authInterceptorProviders, 
	  cookieInterceptorProviders, 
	  CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
