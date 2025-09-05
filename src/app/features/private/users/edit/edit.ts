import { Component, computed, effect, inject, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { UserRepositoryServices } from '@data/repositories/user-repository';
import { Role, Usermodel } from '@models/usermodel';
import { v4 as uuidv4 } from 'uuid';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit',
  imports: [CardModule, ButtonModule, InputTextModule, FloatLabelModule, ReactiveFormsModule, SelectModule, ToastModule, InputMaskModule],
  templateUrl: './edit.html',
  providers: [MessageService]
})
export class UserEdit {
  userId: string | null = null;
  tittle = "Agregar usuario";

  private activateRoute = inject(ActivatedRoute);
  private route = inject(Router);
  private data = toSignal(this.activateRoute.data);

  userData: Signal<Usermodel | null> = computed(() => this.data()?.['userData'] ?? null);
  roles = Object.values(Role).map(role => ({ label: role, value: role }));
  disableForm = false;

  userForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(4), Validators.maxLength(12)] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.email, Validators.required] }),
    role: new FormControl<Role | null>(null, { validators: [Validators.required] }),
    phone: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });


  constructor(private messageService: MessageService, private userRepo: UserRepositoryServices) {
    this.userId = this.activateRoute.snapshot.paramMap.get('id') ?? null;
    if (this.route.routerState.snapshot.url.includes("user-edit")) {
      this.tittle = "Editar usuario";
    } else if (this.route.routerState.snapshot.url.includes("user-info")) {
      this.tittle = "Información del usuario";
      this.disableForm = true;
      this.userForm.disable();
    }

    effect(() => {
      const user = this.userData();
      if (user) {
        this.fillForm(user);
      }
    });
  }

  async sumbitUser() {
    if ((this.userForm.invalid)) {
      this.messageService.add({ severity: 'warn', summary: 'Formulario invalido', detail: 'Favor de revisar los datos ingresados' });
      this.userForm.markAllAsTouched()
      return;
    }
    const user: Usermodel = {
      name: this.userForm.value.name ?? '',
      username: this.userForm.value.username ?? '',
      email: this.userForm.value.email ?? '',
      role: this.userForm.value.role ?? Role['User'],
      phone: this.userForm.value.phone ?? '',
      uuid: this.userId ?? uuidv4()
    };
    const result = await this.userRepo.createUser(user);
    if (result) {
      this.messageService.add({ severity: 'success', summary: 'Guardado exitoso', detail: 'Se guardaron los datos con exito, redirigiendo al listado' });
      this.route.navigate(['/admin/user-list']);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Ocurrrio un error', detail: 'Ocurrio un error durante el guardado, favor de intentar mas tarde' });
    }
  }

  fillForm(userData: Usermodel) {
    this.userForm.patchValue({
      name: userData.name,
      username: userData.username,
      email: userData.email,
      role: userData.role,
      phone: userData.phone
    });
  }

  regresar() {
    this.route.navigate(['/admin/user-list']);
  }

}

