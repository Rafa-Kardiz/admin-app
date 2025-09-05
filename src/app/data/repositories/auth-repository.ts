import { Injectable } from '@angular/core';
import { GeneralApiService } from '@data/data-sources/remote/general-api';
import { UserLoginModel, Usermodel } from '@models/usermodel';
import { IAuthRepository } from '@repositories/auth-repository';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '@enviroments/environment';
import { LocalStorageService } from '@data/data-sources/local/local-storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthRepositoryService implements IAuthRepository {

  constructor(private apiService: GeneralApiService, private storageService: LocalStorageService, private router: Router) { }

  async authLogin(userLogin: UserLoginModel): Promise<Usermodel | null> {
    const baseUrl = environment.authUrl;
    try {
      const users = await this.apiService.httpGet<Usermodel[]>(baseUrl).toPromise();
      if (users) {
        let user = users.find(user =>
          user.email === userLogin.usuario && user.password === userLogin.contrasenia
        );
        if (!user) return null;
        user.password = "";
        this.storageService.setItem("user", user)
        return user;
      }
      return null
    } catch (error) {
      console.error('Error en authLogin:', error);
      throw new Error(`Ocurrió un error: ${error}`);
    }
  }

  async logout(): Promise<void> {
    await this.storageService.clearAll();
    this.router.navigateByUrl('/login')
  }

  getToken(): string {
    return uuidv4();
  }
}
