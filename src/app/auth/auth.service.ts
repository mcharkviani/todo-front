import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

const  helper = new JwtHelperService();

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
  getUser() {
    return this.http.get<any>(`${this.authUrl}/me`);
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
  sendToken(token: any) {
    return localStorage.setItem('token', token);
  }
  decodeToken(token: string) {
    return helper.decodeToken(token);
  }
}
