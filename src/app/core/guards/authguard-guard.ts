import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '@data/data-sources/local/local-storage';
import { Usermodel } from '@models/usermodel';

export const authguardGuard: CanActivateFn = (route, state) => {

  const userSub = inject(LocalStorageService).getItem<Usermodel>("user");
  let user = null;
  userSub.subscribe(us => {
    user = us
  });
  const router = inject(Router);
  const actualPath = route.routeConfig?.path;


  // // si no existe ususario lo redirigimos al login
  if (!user) {
    router.navigate(['/login']);
    return false;
  }
  return true;

};
