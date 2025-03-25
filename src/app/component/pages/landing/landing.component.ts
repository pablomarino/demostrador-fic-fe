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
  constructor(public languageService: LanguageService) { }
}
