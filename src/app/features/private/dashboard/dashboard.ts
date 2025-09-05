import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { LocalStorageService } from '@data/data-sources/local/local-storage';
import { Usermodel } from '@models/usermodel';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { AuthRepositoryService } from '@data/repositories/auth-repository';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, ToolbarModule, ButtonModule, AvatarModule, MenubarModule, MenuModule],
  templateUrl: './dashboard.html'
})
export class Dashboard {
  userLocal = inject(LocalStorageService).getItem<Usermodel>("user");
  user: Usermodel | null = null;
  items: MenuItem[] = [
    // { label: "Home", url: "/admin/home" },
    { label: "Usuarios", url: "/admin/user-list" }
  ];

  constructor(private authService: AuthRepositoryService) {
    this.userLocal.subscribe(usr => {
      this.user = usr;
    });
  }

  logout() {
    this.authService.logout();
  }

}
