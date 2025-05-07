// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsulterAnnoncesComponent } from './etudiant/consulter-annonces/consulter-annonces.component';
import { AjouterCoursComponent } from './etudiant/ajouter-cours/ajouter-cours.component';
import { ConsulterCoursComponent } from './etudiant/consulter-cours/consulter-cours.component';
import { PublierProblemeComponent } from './etudiant/publier-probleme/publier-probleme.component';
import { RepondreProblemeComponent } from './etudiant/repondre-probleme/repondre-probleme.component';





const routes: Routes = [
  { path: 'etudiant/consulter-annonces', component: ConsulterAnnoncesComponent },
  { path: 'etudiant/ajouter-cours', component: AjouterCoursComponent },
  { path: 'etudiant/consulter-cours', component: ConsulterCoursComponent },
  { path: 'etudiant/publier-probleme', component: PublierProblemeComponent },
  { path: '', redirectTo: '/etudiant/consulter-annonces', pathMatch: 'full' },
  { path: '**', redirectTo: '/etudiant/consulter-annonces' },
  { path: 'repondre-probleme/:problemeId', component: RepondreProblemeComponent }

  
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }