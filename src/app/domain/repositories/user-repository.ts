import { Usermodel } from "@models/usermodel";
import { Observable } from "rxjs";

export interface IUserRepository {
   createUser(user: Usermodel): boolean;
   editUser(idUser: number): Promise<Usermodel>;
   deleteUser(idUser: number): Promise<boolean>;
   getUser(idUser: number): Promise<Usermodel | undefined>;
   getAllUsers(): Promise<Usermodel[]>
}
