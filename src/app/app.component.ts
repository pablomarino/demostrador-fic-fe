import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { RestService } from './services/rest.service';
import { Proyecto } from './interfaces/proyecto';
import { NavigationComponent } from "./component/navigation/navigation.component";
import { FooterComponent } from "./component/footer/footer.component";
//import { BannerComponent } from "./component/banner/banner.component";
//import { LandingComponent } from "./component/pages/landing/landing.component";
//import { ErrorComponent } from './component/pages/error/error.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, FooterComponent], //, BannerComponent, LandingComponent, ErrorComponent
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demostrador-fic';
  idioma: string = 'es';
  
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
