import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  decodedToken: { [key: string]: string };

  constructor() { }

  isAuthentication(): boolean {
    const token = localStorage.getItem("accessToken");

    return token !== null;
  }

  setToken(data: object): void {
    localStorage.setItem("accessToken", data["accessToken"]);
    localStorage.setItem("refreshToken", data["refreshToken"]);
  }

  get accessToken(): string {
    return localStorage.getItem("accessToken");
  }

  get refreshToken(): string {
    return localStorage.getItem("refreshToken");
  }

  decodeToken() {
    if (this.accessToken) {
      this.decodedToken = jwt_decode(this.accessToken);
    }
  }

  get user(): string {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['sub'] : null;
  }

  get email(): string {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['email'] : null;
  }

  get expiryTime(): number {
    this.decodeToken();
    return this.decodedToken ? +this.decodedToken['exp'] : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = this.expiryTime;
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }

}
