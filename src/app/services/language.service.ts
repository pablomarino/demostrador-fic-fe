import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { RestService } from './rest.service';
import { Traduccion } from '../interfaces/proyecto';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private language = 'es';
  private translationsArray!: Traduccion[];
  private translationsMap = new Map<number, string>();

  constructor(
    private restService: RestService,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
  ) { }

  changeLanguage(language: string) {
    this.language = language;
    this.fetchTranslation(language).then(() => {
      this.modifyURL(language)
      this.setHtmlLanguage(language)
      // titulo de la página
      this.titleService.setTitle(this.getTranslation(1))
    }).catch(error => {
      this.restService.showErrorPage(this.language)
      console.error("LanguageService error durante el cambio de idioma")
    })
  }

  async fetchTranslation(language: string) {
    try {
      this.translationsArray = await firstValueFrom(this.restService.getTranslations(language));
      this.translationsMap.clear();

      this.translationsArray.forEach(t => {
        this.translationsMap.set(t.id_referencia, t.texto);
      });

    } catch (error) {
      this.restService.showErrorPage(this.language)
      console.error('Languageservice - Error obteniendo traducciones :', error);
      return;
    }
  }

  getTranslation(key: number): string {
    key = parseInt(key.toString()) // si no hago este cast de ida y vuelta pasan cosas con referencias >= 1000 ¿?¿?
    return this.translationsMap.get(key) || '░░░░░░░░';
  }

  modifyURL(language: string) {
    const urlSegments = this.router.url.split('/'); // Divide la URL en segmentos
    urlSegments[1] = language; // Reemplaza el idioma actual en la URL
    const newUrl = urlSegments.join('/'); // Reconstruye la URL
    this.router.navigateByUrl(newUrl); // Navega a la nueva URL
  }

  setHtmlLanguage(language: string) {
    // Atributo de idioma del html
    this.metaService.updateTag({ name: 'language', content: language });
    document.documentElement.lang = language;
  }

  getLanguage(): string {
    return this.language;
  }
}
