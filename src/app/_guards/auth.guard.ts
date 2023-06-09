import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseResponse, ResponseStatusEnum } from 'src/app/_models/base-response.model';
import { AuthService } from 'src/app/_services/auth.service';
import { JwtService } from '../_services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private jwtService: JwtService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.jwtService.isAuthentication()) {
      return false;
    }
    if (this.jwtService.user) {
      if (this.jwtService.isTokenExpired()) {
        // Should Redirect Sig-In Page
        this.router.navigateByUrl('/admin/login')
      } else {
        return true;
      }
    } else {
      this.authService.refreshToken(this.jwtService.refreshToken).subscribe({
        next: (v: BaseResponse) => {
          if (v.status === ResponseStatusEnum.success) {
            this.jwtService.setToken(v.data);
            return true;
          }
          return false;
        },
        error: (e) => {
          return false;
        },
        complete: () => {
          //this.router.navigateByUrl('/chat/home');
        }
      })
    }
    return true;
  }
}
