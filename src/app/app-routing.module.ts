import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Page initiale
  { path: 'etudiant/:id', canActivate: [AuthGuard], loadChildren: () => import('./etudiant/etudiant.module').then(m => m.EtudiantModule) },
  { path: 'professeur/:id', canActivate: [AuthGuard], loadChildren: () => import('./professeur/professeur.module').then(m => m.ProfesseurModule) },
  { path: '**', redirectTo: '' } // Redirige les routes inconnues vers la page de login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }