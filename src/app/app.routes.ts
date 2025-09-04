import { Routes } from '@angular/router';
import { authguardGuard } from '@guards/authguard-guard';

export const routes: Routes = [
   {
      path: "login",
      loadComponent: () => import('./features/public/login/login').then(m => m.Login)
   },
   {
      path: "admin",
      loadChildren: () => import("./features/private/AdminModule.routes").then(m => m.AdminRoutingModule),
      canActivate: [authguardGuard]
   },
   {
      path: "",
      redirectTo: "login",
      pathMatch: "full"
   },
   {
      path: "**",
      loadComponent: () => import('./features/public/error-page/error-page').then(m => m.ErrorPage)
   }
];
