import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TOTALVIEW_API_URL } from '../_contants/api.constants';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	withCredentials: true,
	observe: 'response' as 'response'
  };

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(TOTALVIEW_API_URL + 'security/login', {
      username,
      password
    }, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(TOTALVIEW_API_URL + 'security/logout', httpOptions);
  }
}
