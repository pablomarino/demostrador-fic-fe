import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  error_title = "Se ha producido un error"
  error_description = "Compruebe la direccion a la que esta tratando de acceder, si el error persiste pongase en contacto con el servicio técnico"

}
