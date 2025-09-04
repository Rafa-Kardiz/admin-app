import { UserLoginModel, Usermodel } from "@models/usermodel";

export interface IAuthRepository {
   authLogin(userLogin: UserLoginModel): Promise<Usermodel | null>;
   logout(): void;
   getToken(): string;
}
