import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../../interfaces/proyecto';
import { RestService } from '../../../services/rest.service';
import { ActivatedRoute} from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{
  proyecto!: Proyecto;
  id: string | null = null;
  showImageModal: boolean = false;
  imagenSeleccionada: string = '';

  constructor(
    private route: ActivatedRoute,
    private restService: RestService,
    public languageService: LanguageService,
  ){}

  ngOnInit():void{
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.restService.getProyecto(this.id!).subscribe({
      next: (data) => {
        //console.log(data)
        this.proyecto = data;
      },
      error: (error) => {
        this.restService.showErrorPage(this.languageService.getLanguage())
        console.error('Error al obtener proyectos:', error);
      }
    });
  }

  abrirModal(url: string) {
    this.imagenSeleccionada = url;
    this.showImageModal = true;
  }

  cerrarModal() {
    this.showImageModal = false;
  }






    imagenActual = 0;

    // Para ir a la imagen anterior
    anterior() {
      if (this.imagenActual > 0) {
        this.imagenActual--;
      }
    }

    // Para ir a la siguiente imagen
    siguiente() {
      if (this.imagenActual < this.proyecto.imagenes.length - 1) {
        this.imagenActual++;
      }
    }

    // Para ir directamente a una imagen específica (clic en el punto)
    irAImagen(index: number) {
      this.imagenActual = index;
    }


}
