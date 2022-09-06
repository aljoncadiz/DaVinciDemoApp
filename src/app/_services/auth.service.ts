import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIGATEWAY_URL } from '../_contants/api.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
	  	private http: HttpClient
	  ) { }

	  authenticate(): Observable<any> {
		return this.http.post(APIGATEWAY_URL + 'auth/authenticate', httpOptions);
	  }

	  refreshToken(): Observable<any> {
		return this.http.post(APIGATEWAY_URL + 'token/refresh', httpOptions);
	  }

	  refreshTokenUsingMag(): Observable<any> {
		return this.http.post(APIGATEWAY_URL + 'token/refreshusingmag', httpOptions);
	  }
}
