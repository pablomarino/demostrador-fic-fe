import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from '../interfaces/proyecto';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private baseUrl: string = 'http://localhost:3000'; // TODO: Obtener a traves de un fichero de configuración la URL base del servicio NestJS

  constructor(private http: HttpClient) {}

  // Método para obtener todos los proyectos
  getProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.baseUrl}/proyectos`);
  }
}
