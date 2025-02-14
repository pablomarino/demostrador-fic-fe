import { Component, ChangeDetectorRef } from '@angular/core';
import { Proyecto } from '../../interfaces/proyecto';
import { RestService } from '../../services/rest.service';

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

  constructor(private restService: RestService/*, private cd: ChangeDetectorRef*/) {}

  ngOnInit(): void {
    this.restService.getProyectos().subscribe({
      next: (data) => {
        this.proyectos = data;
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
}
