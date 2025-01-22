import { Routes } from '@angular/router';
import { LandingComponent } from './component/pages/landing/landing.component';
import { ErrorComponent } from './component/pages/error/error.component';
import { ProjectComponent } from './component/pages/project/project.component';

export const routes: Routes = [
    { path: 'landing', component: LandingComponent },
    { path: 'projects/:id', component:ProjectComponent },
    { path: 'projects', redirectTo: '/projects/0', pathMatch: 'full' },
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: '/error', pathMatch: 'full' },
]