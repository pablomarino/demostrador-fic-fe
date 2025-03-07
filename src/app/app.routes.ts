import { Routes } from '@angular/router';
import { LandingComponent } from './component/pages/landing/landing.component';
import { ErrorComponent } from './component/pages/error/error.component';
import { ProjectComponent } from './component/pages/project/project.component';
import { WallComponent } from './component/pages/wall/wall.component';

export const routes: Routes = [
    { path: 'landing', component: LandingComponent },
    { path: 'projects/:id', component: ProjectComponent },
    { path: 'projects', component: WallComponent },
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: '/error', pathMatch: 'full' },
]