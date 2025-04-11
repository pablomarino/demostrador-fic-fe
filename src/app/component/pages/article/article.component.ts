import { Component } from '@angular/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  constructor(public languageService: LanguageService) {}
}
