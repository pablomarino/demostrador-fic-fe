import { Component } from '@angular/core';
import { BannerComponent } from '../../banner/banner.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [BannerComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  landing_h2:String = "Innovación y Tecnología: Proyectos que Transforman el Futuro desde la FIC"
  landing_p:String = "Descubre los proyectos más destacados que salen de la Facultad de Informática de la Coruña, donde la creatividad, el conocimiento y la pasión por la tecnología se unen para resolver problemas reales. Explora el talento de nuestros estudiantes y cómo están diseñando soluciones que impactan en la sociedad y la industria."

}
