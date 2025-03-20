import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LanguageGuard implements CanActivate {
  private allowedLangs = ['es', 'en', 'gl'];

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('URL completa:', state.url);
    console.log('Parámetros de la ruta:', route.params);

    const lang = route.params['lang'];
    
    console.log(`--------------------- Idioma detectado: ${lang}`);
    if (this.allowedLangs.includes(lang)) {
      return true;
    }
    console.log(`--------------------- Idioma no valido: ${lang}`);
    // Si el idioma no es válido, redirigir al idioma por defecto
    this.router.navigate(['/es/home']);
    return false;
  }
}
