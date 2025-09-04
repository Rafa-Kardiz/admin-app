import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '@components/table/table';
import { tableModel } from '@models/tablemodel';
import { Role, Usermodel } from '@models/usermodel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-list',
  imports: [TableComponent, CardModule, ButtonModule],
  templateUrl: './list.html'
})
export class UserList {
  columList: tableModel[] = [
    { name: "Usuario", key: "username" },
    { name: "Nombre", key: "name" },
    { name: "Telefono", key: "phone" }
  ];

  data: Usermodel[] = [
    { id: 1, name: "Rafael", username: "rperez", email: "rperez@gmail.com", role: Role["coordinator"], password: "", phone: "123456789" },
    { id: 2, name: "Erick", username: "erk", email: "erk@gmail.com", role: Role["coordinator"], password: "", phone: "78485" },
    { id: 3, name: "Itzel", username: "itzSand", email: "itzSand@gmail.com", role: Role["coordinator"], password: "", phone: "456984165" },
    { id: 4, name: "Gustavo", username: "tavo", email: "tavo@gmail.com", role: Role["coordinator"], password: "", phone: "564987" },
    { id: 5, name: "Moises", username: "moi", email: "moi@gmail.com", role: Role["coordinator"], password: "", phone: "789456456" }
  ]

  constructor(private router: Router) {

  }

  editUser(e: number) {
    this.router.navigate(['/admin', 'user-edit', e.toString()]);
  }

  deleteUser(e: number) {
    console.log("borrar", e);
  }

  addUser() {
    this.router.navigate(['/admin', 'user-add']);
  }

}
