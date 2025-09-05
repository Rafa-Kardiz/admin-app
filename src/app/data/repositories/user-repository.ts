import { Injectable } from '@angular/core';
import { UserLocalDbService } from '@data/data-sources/local/user-local-db';
import { GeneralApiService } from '@data/data-sources/remote/general-api';
import { environment } from '@enviroments/environment';
import { Role, Usermodel } from '@models/usermodel';
import { IUserRepository } from '@repositories/user-repository';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryServices implements IUserRepository {

  constructor(
    private local: UserLocalDbService,
    private remote: GeneralApiService
  ) { }


  async createUser(user: Usermodel): Promise<boolean> {
    try {
      await this.local.save(user);
      return true;
    } catch (error) {
      console.log("ocurrio un error " + error);
      return false;
    }
  }

  editUser(uuid: string): Promise<Usermodel> {
    throw new Error('Method not implemented.');
  }

  async deleteUser(uuid: string): Promise<boolean> {
    try {
      await this.local.delete(uuid);
      return true;
    } catch (error) {
      console.log("ocurrio un error con la eliminacion");
      return false
    }
  }

  async getUser(uuid: string): Promise<Usermodel | undefined> {
    return await this.local.getById(uuid);
  }

  async getAllUsers(): Promise<Usermodel[]> {
    try {
      // primero obtenemos de local 
      let users: Usermodel[] = await this.local.getAll();
      // si hay datos regresamos lo que hay en local 
      if (users.length > 0) return users;
      // En caso contrario vamos por el listado al endpoint y actualizamos el local
      users = await firstValueFrom(this.remote.httpGet<Usermodel[]>(environment.usersApi));
      for (const user of users) {
        user.uuid = uuidv4();
        user.role = Role["User"]
        await this.local.save(user);
      }
      return users;
    } catch {
      console.log("Ocurrio un error al obtener los usuarios")
      return []
    }
  }

}
