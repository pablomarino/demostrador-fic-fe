import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto, Traduccion } from '../interfaces/proyecto';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestService {

  private baseUrl: string = environment.apiUrl+":"+environment.apiPort;//'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private route: Router,
  ) {}

  getProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.baseUrl}/proyecto`);
  }

  getProyecto(id:string): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${this.baseUrl}/proyecto/${id}`);
  }

  getTranslations(language:string): Observable<Traduccion[]>{
    return this.http.get<Traduccion[]>(`${this.baseUrl}/traduccion/idioma/${language}`);
  }

  showErrorPage(language:string) {
    this.route.navigate([`${language}/error`])
  }
}
