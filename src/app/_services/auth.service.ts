import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(data: object): Observable<Object> {
    return this.http.post(this.baseUrl + "/Login", data);
  }

  register(data: object): Observable<Object> {
    return this.http.post(this.baseUrl + "/Register", data);
  }

  forgotPassword(data: object): Observable<Object> {
    return this.http.post(this.baseUrl + "/ForgotPassword", data);
  }

  resetPassword(data: object): Observable<Object> {
    return this.http.post(this.baseUrl + "/ResetPassword", data);
  }

  emailConfirmation(data: object): Observable<Object> {
    return this.http.post(this.baseUrl + "/EmailConfirmation", data);
  }

  refreshToken(data: string): Observable<Object> {
    return this.http.post(this.baseUrl + "/RefreshToken", data);
  }


}
