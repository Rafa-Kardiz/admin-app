import { Injectable } from '@angular/core';
import { UserLocalDbService } from '@data/data-sources/local/user-local-db';
import { GeneralApiService } from '@data/data-sources/remote/general-api';
import { environment } from '@enviroments/environment';
import { Usermodel } from '@models/usermodel';
import { IUserRepository } from '@repositories/user-repository';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryServices implements IUserRepository {

  constructor(
    private local: UserLocalDbService,
    private remote: GeneralApiService
  ) { }


  createUser(user: Usermodel): boolean {
    try {
      this.local.save(user);
      return true;
    } catch (error) {
      return false;
    }
  }

  editUser(idUser: number): Promise<Usermodel> {
    throw new Error('Method not implemented.');
  }

  async deleteUser(idUser: number): Promise<boolean> {
    await this.local.delete(idUser.toString());
    return true
  }

  async getUser(idUser: number): Promise<Usermodel | undefined> {
    return this.local.getById(idUser.toString());
  }

  async getAllUsers(): Promise<Usermodel[]> {
    try {
      let remoteUsers: Usermodel[] = [];
      this.remote.httpGet(environment.usersApi).subscribe(usr => {
        remoteUsers = usr as Usermodel[]
      });

      if (remoteUsers) {
        // sincronizamos
        for (const user of remoteUsers) {
          await this.local.save(user);
        }
        return remoteUsers;
      }
    } catch {
      return this.local.getAll();
    }
    return [];
  }

}
