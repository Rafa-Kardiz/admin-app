import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '@data/data-sources/local/local-storage';
import { Usermodel } from '@models/usermodel';
import { map, take } from 'rxjs/operators';

export const roleGuard: CanActivateFn = (route, state) => {
  const localStorage = inject(LocalStorageService);
  const router = inject(Router);

  return localStorage.getItem<Usermodel>("user").pipe(
    take(1),
    map(user => {
      if (user && user.role === "coordinator") {
        router.navigate(['/admin/user-list']);
        return false;
      }
      return true;
    })
  );
};