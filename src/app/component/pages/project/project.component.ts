import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../../interfaces/proyecto';
import { RestService } from '../../../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{
  proyecto!: Proyecto;
  id: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private restService: RestService, 
    private router: Router,
    private languageService: LanguageService,
  ){}

  ngOnInit():void{
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.restService.getProyecto(this.id!).subscribe({
      next: (data) => {
        console.log(data)
        this.proyecto = data;
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
