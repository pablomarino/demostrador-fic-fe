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
  proyectosAgrupados: { fecha: string, data: Proyecto[] }[] = [];
  imageLoading: boolean[] = [];// Array para gestionar el estado de carga de las imágenes

  constructor(
    private restService: RestService,
    public languageService: LanguageService
  ) { }


  ngOnInit(): void {

    this.restService.getProyectos().subscribe({
      next: (data) => {
        // Primero ordenamos los proyectos por año en orden descendente
        data.sort((a, b) => {
          const yearA = new Date(a.eventos[0].fecha).getFullYear();
          const yearB = new Date(b.eventos[0].fecha).getFullYear();
          return yearB - yearA;
        });

        //this.proyectos = data.reverse();
        this.proyectos = data;
        this.imageLoading = new Array(this.proyectos.length).fill(true);
        this.agruparPorFecha()
      },
      error: (error) => {
        this.restService.showErrorPage(this.languageService.getLanguage())
        console.error('Error al obtener proyectos:', error);
      }
    });
  }


  // Función para agrupar los proyectos por año
  agruparPorFecha(): void {
    const agrupados: { fecha: string, data: Proyecto[] }[] = [];

    // Recorrer todos los proyectos
    this.proyectos.forEach(proyecto => {
      const year = new Date(proyecto.eventos[0].fecha).getFullYear().toString();

      // Verificar si el año ya está en el array de agrupados
      const grupoExistente = agrupados.find(group => group.fecha === year);

      if (grupoExistente) {
        // Si ya existe el grupo, añadir el proyecto a ese grupo
        grupoExistente.data.push(proyecto);
      } else {
        // Si no existe, crear un nuevo grupo para ese año
        agrupados.push({
          fecha: year,
          data: [proyecto]
        });
      }
    });

    // Asignar los proyectos agrupados a la variable `proyectosAgrupados`
    this.proyectosAgrupados = agrupados;
  }


  // Función que se ejecuta cuando la imagen se ha cargado
  onImageLoad(index: number): void {
    // Ocultar el spinner para la imagen cargada
    this.imageLoading[index] = false;
  }

}
