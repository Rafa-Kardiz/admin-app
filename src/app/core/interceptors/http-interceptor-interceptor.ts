import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthRepositoryService } from '@data/repositories/auth-repository';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthRepositoryService).getToken();

  const newRequest = req.clone({
    headers: req.headers.set('Autorization', authToken)
  })
  return next(newRequest);
};
