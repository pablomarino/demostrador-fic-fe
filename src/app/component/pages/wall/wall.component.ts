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
    public languageService: LanguageService
  ) { }
   // Array para gestionar el estado de carga de las imágenes
   imageLoading: boolean[] = [];

  ngOnInit(): void {

    this.restService.getProyectos().subscribe({
      next: (data) => {
        this.proyectos = data;
        this.imageLoading = new Array(this.proyectos.length).fill(true);
      },
      error: (error) => {
        this.restService.showErrorPage(this.languageService.getLanguage())
        console.error('Error al obtener proyectos:', error);
      }
    });
  }



   // Función que se ejecuta cuando la imagen se ha cargado
   onImageLoad(index: number): void {
     // Ocultar el spinner para la imagen cargada
     this.imageLoading[index] = false;
   }

}
