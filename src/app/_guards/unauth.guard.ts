import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../_services/jwt.service';
import { inject } from '@angular/core';

export const unauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtService = inject(JwtService);

  if (jwtService.isAuthentication() && !jwtService.isTokenExpired()) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
