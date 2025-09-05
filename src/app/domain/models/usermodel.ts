export interface Usermodel {
   id?: number,
   name: string,
   username: string,
   email: string,
   role: Role,
   password?: string,
   phone?: string,
   address?: Address,
   company?: Company,
   uuid: string
}

export enum Role {
   Manager = "manager",
   Coordinator = "coordinator",
   User = "user"
}

export interface UserLoginModel {
   usuario: string | null,
   contrasenia: string | null
}

export interface Address {
   street: string;
   suite: string;
   city: string;
   zipcode: string;
   geo: Geo;
}

export interface Geo {
   lat: string;
   lng: string;
}

export interface Company {
   name: string;
   catchPhrase: string;
   bs: string;
}
