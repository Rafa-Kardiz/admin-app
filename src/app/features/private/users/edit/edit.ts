import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-edit',
  imports: [CardModule, ButtonModule, InputTextModule, FloatLabelModule],
  templateUrl: './edit.html'
})
export class UserEdit {
  userId = 0;
  tittle = "Agregar usuario";
  private activateRoute = inject(ActivatedRoute);
  private route = inject(Router)

  constructor() {
    this.userId = Number(this.activateRoute.snapshot.paramMap.get('id'));
    if (this.route.routerState.snapshot.url.includes("user-edit"))
      this.tittle = "Editar usuario";
  }


}
