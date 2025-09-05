import { Component, computed, inject, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponent } from '@components/table/table';
import { LocalStorageService } from '@data/data-sources/local/local-storage';
import { UserRepositoryServices } from '@data/repositories/user-repository';
import { tableModel, tablePermission } from '@models/tablemodel';
import { Usermodel } from '@models/usermodel';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-list',
  imports: [TableComponent, CardModule, ButtonModule, ConfirmDialogModule, ToastModule],
  templateUrl: './list.html',
  providers: [ConfirmationService, MessageService]
})
export class UserList {
  columList: tableModel[] = [
    { name: "Usuario", key: "username" },
    { name: "Nombre", key: "name" },
    { name: "Telefono", key: "phone" },
    { name: "Correo", key: "email" }
  ];

  userLocal = inject(LocalStorageService).getItem<Usermodel>("user");
  user: Usermodel | null = null;
  userTablePermision: tablePermission = {
    edit: true,
    delete: true,
    crete: true
  }

  private activateRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserRepositoryServices);
  private confrimService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  userData = signal<Usermodel[]>([]);
  constructor() {
    const data = this.activateRoute.snapshot.data['userList'] ?? [];
    this.userData.set(data);
    this.userLocal.subscribe(usr => {
      if (usr && usr["role"] === "coordinator") {
        this.user = usr;
        this.userTablePermision.delete = false;
        this.userTablePermision.edit = false;
      }
    });

  }

  editUser(e: string) {
    this.router.navigate(['/admin', 'user-edit', e]);
  }

  deleteUser(e: string) {
    this.confrimService.confirm({
      message: '¿Desea eliminar este registro?',
      header: 'Eliminar',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: async () => {
        const result = await this.userService.deleteUser(e);

        if (result) {
          const current = this.userData() ?? [];
          const updated = current.filter(user => user.uuid !== e);
          (this.userData as any).set(updated); // ⚡ solo si defines `userData` como `signal`

          this.messageService.add({ severity: 'info', summary: 'Eliminado', detail: 'Registro eliminado' });
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Cancelaste la eliminación' });
      },
    });
  }

  addUser() {
    this.router.navigate(['/admin', 'user-add']);
  }

  viewDetail(e: string) {
    this.router.navigate(['/admin', 'user-info', e]);
  }

}
