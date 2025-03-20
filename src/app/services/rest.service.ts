import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto, Traduccion } from '../interfaces/proyecto';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private baseUrl: string = 'http://localhost:3000';
  //private baseUrl: string = 'http://localhost:3200'; 

  constructor(private http: HttpClient) {}

  getProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.baseUrl}/proyecto`);
    //return new Observable<Proyecto[]>
  }

  getProyecto(id:string): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${this.baseUrl}/proyecto/${id}`);
  }

  getTraducciones(idioma:string): Observable<Traduccion[]>{
    return this.http.get<Traduccion[]>(`${this.baseUrl}/traduccion/idioma/${idioma}`);
  }
}
