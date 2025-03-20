import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit{
  currentLang!: string; // para construir las rutas

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.languageService.lang$.subscribe(lang => {
      this.currentLang = lang;
    });
    
    //this.languageService.changeLang(this.languageService.getLang());


    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Filtrar solo los eventos de navegación finalizada.
    ).subscribe(() => {
      const langFromUrl = this.router.url.split('/')[1]; // Obtén el idioma de la URL.
      if (this.languageService.allowedLangs.includes(langFromUrl)) {
        this.languageService.changeLang(langFromUrl); // Cambia el idioma si está permitido.
      }
    });

  }
  
  

  changeLanguage(lang: string) {
    //this.currentLang = lang;
    this.languageService.changeLang(lang);
  }

  getTraduccion(id:number):string{
    return this.languageService.getTraduccion(id) || "--";
  }

}
