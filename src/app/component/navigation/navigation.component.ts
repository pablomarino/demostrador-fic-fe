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
export class NavigationComponent implements OnInit {

  constructor(
    public languageService: LanguageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Filtrar solo los eventos de navegación finalizada.
    ).subscribe(() => {
      const languageFromURL = this.router.url.split('/')[1]; // Obtén el idioma de la URL.
      console.log('LANG navigation.languageFromURL '+languageFromURL)
      this.languageService.changeLanguage(languageFromURL);
    });
  }
}
