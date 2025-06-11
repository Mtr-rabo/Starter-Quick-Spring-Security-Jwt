import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const httpIntercepterInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if (authService.isAuthenticated) {
    const clonedReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${authService.accessToken}`
      ),
    });
    return next(clonedReq).pipe(
      // Handle any errors that might occur during the request
      catchError((error) => {
        // You can handle the error here
        console.error('Error occurred:', error);
        if (error.status === 401) {
          // If the error is 401 Unauthorized, you might want to redirect to login
          authService.logout();
          // Optionally, you can redirect to a login page or show a message
          console.error('Unauthorized request - redirecting to login');
        }
        return throwError(error.message || 'Server error');
      })
    );
  }
  return next(req);
};
