import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = environment.apiUrl + '/auth';
  registerUrl = this.authUrl + '/register';
  loginUrl = this.authUrl + '/login';

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }
  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  logOut() {
    return localStorage.removeItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
