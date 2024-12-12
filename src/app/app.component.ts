import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { RestService } from './services/rest.service';
import { Proyecto } from './interfaces/proyecto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demostrador-fic';
  
  data!:Proyecto[];

  constructor(private service: RestService){}  

  ngOnInit() {
    this.service.getProyectos().subscribe(
      (response) => {
        this.data = response
        console.log(this.data)
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }
}
