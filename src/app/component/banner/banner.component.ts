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
    // muestro los proyectos del ultimo año y si no son suficientes añado aleatoriamente de años anteriores
    this.restService.getProyectos().subscribe({
      next: (data) => {
        // Ordeno por el año del primer evento
        data.sort((a, b) => {
          // Extraemos el año de las fechas de los eventos
          const yearA = new Date(a.eventos[0].fecha).getFullYear();
          const yearB = new Date(b.eventos[0].fecha).getFullYear();
          // Ordenamos de mayor a menor (descendente)
          return yearB - yearA;
        });
        // Obtener el año más reciente del conjunto de datos
        const mostRecentYear = new Date(data[0].eventos[0].fecha).getFullYear();
        // Contar cuántos proyectos son de ese año
        const countMostRecent = data.filter(proyecto => {
          const year = new Date(proyecto.eventos[0].fecha).getFullYear();
          return year === mostRecentYear;
        }).length;
        // obtengo los proyectos del utlimo año
        this.proyectos=data.slice(0,countMostRecent);//this.visible_projects))
        // no voy a hacer shuffle del array final asi que desordeno los del último año
        this.proyectos =this.shuffleArray(this.proyectos)
        // obtengo proyectos de otros años
        const proyectosOtrosAños=this.shuffleArray(data.slice(countMostRecent,data.length)).slice(0,this.visible_projects-countMostRecent);
        // los concateno
        this.proyectos =this.proyectos.concat(proyectosOtrosAños);
        // o bien los concateno desordenados
        // this.proyectos = this.shuffleArray(this.proyectos.concat(proyectosOtrosAños));
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
