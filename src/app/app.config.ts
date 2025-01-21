import { provideHttpClient } from '@angular/common/http'; 
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { RestService } from './services/rest.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), 
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding())
  ]
};
