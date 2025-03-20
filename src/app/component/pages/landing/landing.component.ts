import { Component } from '@angular/core';
import { BannerComponent } from '../../banner/banner.component';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [BannerComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(private languageService: LanguageService) { }
  
  getTraduccion(id: number): string {
    console.log (`landing.component--------------------------${{id}}`)
    return this.languageService.getTraduccion(id)!;
  }
}
