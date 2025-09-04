import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
   {
      path: "",
      component: Dashboard,
      children: [
         {
            path: "home",
            loadComponent: () => import('./home/home').then(m => m.Home)
         },
         {
            path: "user-list",
            loadComponent: () => import("./users/list/list").then(m => m.UserList)
         },
         {
            path: "user-edit/:id",
            loadComponent: () => import("./users/edit/edit").then(m => m.UserEdit)
         },
         {
            path: "user-add",
            loadComponent: () => import("./users/edit/edit").then(m => m.UserEdit)
         },
         {
            path: "",
            redirectTo: "home",
            pathMatch: "full"
         }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class AdminRoutingModule { }