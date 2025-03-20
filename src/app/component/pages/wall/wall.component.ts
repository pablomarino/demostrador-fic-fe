import { Component } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { Router } from '@angular/router';
import { Proyecto } from '../../../interfaces/proyecto';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-wall',
  standalone: true,
  imports: [],
  templateUrl: './wall.component.html',
  styleUrl: './wall.component.css'
})
export class WallComponent {
  currentLang!: string;
  proyectos: Proyecto[] = [];
  constructor(
    private restService: RestService, 
    private router: Router,
    private languageService: LanguageService
  ) {}
    
    ngOnInit(): void {
      this.languageService.lang$.subscribe(lang => {
        this.currentLang = lang;
      });

      this.restService.getProyectos().subscribe({
        next: (data) => {
          this.proyectos=data;
        },
        error: (error) => {
          console.error('Error al obtener proyectos:', error);
        }
      });
    }
    getTraduccion(id:number):string{
      return this.languageService.getTraduccion(id) || "";
    }
}
