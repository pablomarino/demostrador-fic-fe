import { Component } from '@angular/core';
import { LanguageService } from '../../../services/language.service';

interface Traduccion {
  es: string;
  gl: string;
  en: string;
}

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'] // <--- corrección aquí
})
export class ErrorComponent {  
  public error_titulo: Traduccion = {
    es: "Algo ha salido mal",
    gl: "Algo saíu mal",
    en: "Something went wrong"
  };

  public error_descripcion: Traduccion = {
    es: `<p>Ha ocurrido un error inesperado. Intenta recargar la página o vuelve más tarde.</p>
         <p>Si el problema persiste, ponte en contacto con el soporte técnico.</p>`,
    gl: `<p>Produciuse un erro inesperado. Tenta recargar a páxina ou volve máis tarde.</p>
         <p>Se o problema persiste, contacta co soporte técnico.</p>`,
    en: `<p>An unexpected error has occurred. Try refreshing the page or come back later.</p>
         <p>If the problem continues, please contact technical support.</p>`
  };

  constructor(public languageService: LanguageService) {}

  getTitulo(): string {
    switch (this.languageService.getLanguage()) {
      case 'gl':
        return this.error_titulo.gl;
      case 'en':
        return this.error_titulo.en;
      default:
        return this.error_titulo.es; // idioma por defecto
    }
  }

  getDescripcion(): string {
    switch (this.languageService.getLanguage()) {
      case 'gl':
        return this.error_descripcion.gl;
      case 'en':
        return this.error_descripcion.en;
      default:
        return this.error_descripcion.es;
    }
  }
}
