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

}
