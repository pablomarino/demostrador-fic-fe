import { Component} from '@angular/core';
import { Proyecto } from '../../interfaces/proyecto';
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';

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


  constructor(
    public restService: RestService,
    private router: Router,
    public languageService: LanguageService
  ) {}

  private intervalId: any;
  private update_interval = 10000;
  private visible_projects:number = 7;

  ngOnInit(): void {

    this.restService.getProyectos().subscribe({
      next: (data) => {
        this.proyectos=this.shuffleArray(data.slice(0,this.visible_projects))
      },
      error: (error) => {
        this.restService.showErrorPage(this.languageService.getLanguage())
        console.error('Error al obtener proyectos:', error);
      }
    });
    this.startTimer();
  }

  update_selected_project(arg:number){
    clearInterval(this.intervalId);
    this.selected_project=arg;
    this.startTimer()
  }

  navigate_to_project() {
     this.router.navigate([`${this.languageService.getLanguage()}/proyecto/${this.proyectos[this.selected_project].id_proyecto}`]);
  }

  // Función para hacer shuffle de una matriz
  shuffleArray(array: Proyecto[]): Proyecto[] {
    let shuffledArray = array.slice();  // Copiar la matriz original
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];  // Intercambiar elementos
    }
    return shuffledArray;
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.selected_project = (this.selected_project + 1) % this.visible_projects;
      this.update_selected_project(this.selected_project);
    }, this.update_interval); // Cambia cada 3 segundos (ajusta el tiempo según necesites)
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); // Limpia el intervalo cuando el componente se destruye
  }
}
