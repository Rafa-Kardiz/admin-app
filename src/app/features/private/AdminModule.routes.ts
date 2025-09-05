import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { userListResolver, userResolver } from 'app/core/resolvers/user-resolver';
import { roleGuard } from '@guards/role-guard';

export const routes: Routes = [
   {
      path: "",
      component: Dashboard,
      children: [
         // {
         //    path: "home",
         //    loadComponent: () => import('./home/home').then(m => m.Home)
         // },
         {
            path: "user-list",
            loadComponent: () => import("./users/list/list").then(m => m.UserList),
            resolve: {
               userList: userListResolver
            }
         },
         {
            path: "user-edit/:id",
            loadComponent: () => import("./users/edit/edit").then(m => m.UserEdit),
            canActivate: [roleGuard],
            resolve: {
               userData: userResolver
            }
         },
         {
            path: "user-info/:id",
            loadComponent: () => import("./users/edit/edit").then(m => m.UserEdit),
            resolve: {
               userData: userResolver
            }
         },
         {
            path: "user-add",
            loadComponent: () => import("./users/edit/edit").then(m => m.UserEdit)
         },
         {
            path: "",
            redirectTo: "user-list",
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