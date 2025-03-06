import { Component, ChangeDetectorRef } from '@angular/core';
import { Proyecto } from '../../interfaces/proyecto';
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})

export class BannerComponent {
  proyectos: Proyecto[] = [];
  selected_project: number = 0;

  constructor(private restService: RestService, 
    private router: Router/*, private cd: ChangeDetectorRef*/) {}

  ngOnInit(): void {
    this.restService.getProyectos().subscribe({
      next: (data) => {
        this.proyectos=this.shuffleArray(data.slice(0,7))
        //this.proyectos = data;
      },
      error: (error) => {
        console.error('Error al obtener proyectos:', error);
      }
    });
  }

  update_selected_project(arg:number){
    this.selected_project=arg;
    //this.cd.detectChanges();
    console.log(this.selected_project)
  }

  navigate_to_project() {
    console.log(this.proyectos)
    console.log(this.selected_project)
    console.log(this.proyectos[this.selected_project])
    console.log(this.proyectos[this.selected_project].id_proyecto)
    this.router.navigate([`/projects/${this.proyectos[this.selected_project].id_proyecto}`]);
  }

  // Función para hacer shuffle de una matriz
  shuffleArray(array: any[]): any[] {
    let shuffledArray = array.slice();  // Copiar la matriz original
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];  // Intercambiar elementos
    }
    return shuffledArray;
  }
}
