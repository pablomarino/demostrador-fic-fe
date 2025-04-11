import { Routes } from '@angular/router';
import { LandingComponent } from './component/pages/landing/landing.component';
import { ErrorComponent } from './component/pages/error/error.component';
import { ProjectComponent } from './component/pages/project/project.component';
import { WallComponent } from './component/pages/wall/wall.component';
import { LanguageGuard } from './guards/language.guard';
import { ArticleComponent } from './component/pages/article/article.component';

export const routes: Routes = [
    { path: ':lang/inicio', component: LandingComponent , canActivate: [LanguageGuard] },
    { path: ':lang/proyecto/:id', component: ProjectComponent , canActivate: [LanguageGuard] },
    { path: ':lang/proyectos', component: WallComponent , canActivate: [LanguageGuard] },
    { path: ':lang/acerca', component: ArticleComponent , canActivate: [LanguageGuard] },
    { path: '', redirectTo: 'es/inicio', pathMatch: 'full' },
    { path: ':lang/error', component: ErrorComponent , canActivate: [LanguageGuard] },
    { path: '**', redirectTo: 'es/error', pathMatch: 'full' },
]