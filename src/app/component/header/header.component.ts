import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(
    public languageService: LanguageService,
    private router: Router,
  ) { }

  isMenuOpen: Boolean = false;
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Filtrar solo los eventos de navegación finalizada.
    ).subscribe(() => {
      const languageFromURL = this.router.url.split('/')[1]; // Obtén el idioma de la URL.
      this.languageService.changeLanguage(languageFromURL);
    });
  }
}
