import { Usermodel } from "@models/usermodel";
import { Observable } from "rxjs";

export interface IUserRepository {
   createUser(user: Usermodel): Promise<boolean>;
   editUser(uuid: string): Promise<Usermodel>;
   deleteUser(uuid: string): Promise<boolean>;
   getUser(uuid: string): Promise<Usermodel | undefined>;
   getAllUsers(): Promise<Usermodel[]>
}
