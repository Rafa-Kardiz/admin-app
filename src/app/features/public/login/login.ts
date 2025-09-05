import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserLoginModel } from '@models/usermodel';
import { AuthRepositoryService } from '@data/repositories/auth-repository';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CardModule, InputTextModule, FloatLabelModule, PasswordModule, ButtonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './login.html',
  providers: [MessageService]
})
export class Login {
  loginForm = new FormGroup({
    usuario: new FormControl('', [Validators.email, Validators.required]),
    contrasenia: new FormControl('', [Validators.required])
  })

  constructor(private messageService: MessageService, private authRepository: AuthRepositoryService, private router: Router) {

  }

  loginUser() {
    if (this.loginForm.invalid && !this.loginForm.touched) {
      this.messageService.add({ severity: 'warn', summary: 'Formulario invalido', detail: 'Favor de revisar los datos ingresados' });
      this.loginForm.markAllAsTouched()
      return;
    }
    const userLoginData: UserLoginModel = this.loginForm.getRawValue();
    this.authRepository.authLogin(userLoginData).then(result => {
      if (result) {
        this.messageService.add({ severity: 'success', summary: 'Logeo exitoso', detail: `Bienvenido: ${result.username}` });
        this.router.navigate(['/admin']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error al iniciar sesión', detail: `Error en el usuario o contraseña` });
      }

    }).catch(error => {
      console.log(error);
    }

    );
  }
}
