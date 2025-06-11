import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (authService.isAuthenticated && authService.roles.includes('ROLE_ADMIN')) {
    return true;
  } else {
    alert("vous n'avez pas la permission d'accéder à cette page.");
    return false;
  }

  return false;
};
