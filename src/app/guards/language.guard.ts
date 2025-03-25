import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LanguageGuard implements CanActivate {
  private allowedLangs = ['es', 'en', 'gl'];

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const lang = route.params['lang'];

    if (this.allowedLangs.includes(lang)) {
      return true;
    }
    // Si el idioma no es válido, redirigir al idioma por defecto
    this.router.navigate(['/es/home']);
    return false;
  }
}
