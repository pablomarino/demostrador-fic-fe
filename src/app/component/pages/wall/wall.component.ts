import { Component } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { Router } from '@angular/router';
import { Proyecto } from '../../../interfaces/proyecto';

@Component({
  selector: 'app-wall',
  standalone: true,
  imports: [],
  templateUrl: './wall.component.html',
  styleUrl: './wall.component.css'
})
export class WallComponent {
  proyectos: Proyecto[] = [];
  constructor(
    private restService: RestService, 
    private router: Router) {}
    
    ngOnInit(): void {
      this.restService.getProyectos().subscribe({
        next: (data) => {
          this.proyectos=data;
        },
        error: (error) => {
          console.error('Error al obtener proyectos:', error);
        }
      });
    }
}
