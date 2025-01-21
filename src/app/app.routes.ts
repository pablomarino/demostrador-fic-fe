import { Routes } from '@angular/router';
import { LandingComponent } from './component/pages/landing/landing.component';
import { ErrorComponent } from './component/pages/error/error.component';

export const routes: Routes = [
    { path: 'landing', component: LandingComponent },
    //{ path: 'project/:id', component:ProjectComponent },
    //{ path: 'project', redirectTo: '/project/0', pathMatch: 'full' },
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: '/error', pathMatch: 'full' },
]