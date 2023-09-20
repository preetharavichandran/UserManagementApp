import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  if (!_authService.isLoggedIn()) {
    _router.navigate(['/login']); // go to login if not authenticated
    return false;
  }
return true;
}

