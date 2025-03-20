import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { RestService } from './rest.service';
import { Traduccion } from '../interfaces/proyecto';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  allowedLangs = ['es', 'en', 'gl'];
  private defaultLang = 'es';

  private langSubject = new BehaviorSubject<string>(this.detectBrowserLang());
  lang$ = this.langSubject.asObservable(); // Observable para suscribirse
  private traduccionesArray!: Traduccion[];
  private traduccionesMap = new Map<number, string>();

  constructor(private rest: RestService, private router: Router) { }

  private detectBrowserLang(): string {
    const browserLang = navigator.language.slice(0, 2);
    return this.allowedLangs.includes(browserLang) ? browserLang : this.defaultLang;
  }

  setLang(lang: string) {
    if (this.allowedLangs.includes(lang)) {
      this.langSubject.next(lang);
    }
  }

  getLang(): string {
    return this.langSubject.value;
  }

  async changeLang(lang: string) {

    if (!this.langSubject.value) {
      // Detectar el idioma solo si no se ha establecido previamente.
      lang = lang || this.detectBrowserLang();
    }

    try {
      this.traduccionesArray = await firstValueFrom(this.rest.getTraducciones(lang));
      this.traduccionesMap.clear();
      this.traduccionesArray.forEach(t => {
        this.traduccionesMap.set(t.id_referencia, t.texto);
      });
    } catch (error) {
      console.error('Error cargando traducciones:', error);
      return; // Detener ejecución si hay error
    }


    this.setLang(lang)

    const urlSegments = this.router.url.split('/'); // Divide la URL en segmentos

    if (this.allowedLangs.includes(urlSegments[1])) {
      urlSegments[1] = lang; // Reemplaza el idioma actual en la URL
    } else {
      urlSegments.unshift(lang); // Si no hay idioma, lo agrega al inicio
    }

    const newUrl = urlSegments.join('/'); // Reconstruye la URL
    this.router.navigateByUrl(newUrl); // Navega a la nueva URL
  }

  getTraduccion(id: number): string | undefined {
    return this.traduccionesMap.get(id);
  }

}