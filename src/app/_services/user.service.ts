import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TOTALVIEW_API_URL } from '../_contants/api.constants';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	withCredentials: true,
  };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUser(username: string) {
	return this.http.get(TOTALVIEW_API_URL + `users?UserName=${username}`, httpOptions)
  }
}
