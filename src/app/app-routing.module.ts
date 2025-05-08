//app routing module
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EtudiantHomeComponent } from './etudiant/etudiant-home/etudiant-home.component';
import { AjouterCoursComponent as EtudiantAjouterCours } from './etudiant/ajouter-cours/ajouter-cours.component';
import { ConsulterAnnoncesComponent as EtudiantConsulterAnnonces } from './etudiant/consulter-annonces/consulter-annonces.component';
import { ConsulterCoursComponent as EtudiantConsulterCours } from './etudiant/consulter-cours/consulter-cours.component';
import { ConsulterProblemesComponent as EtudiantConsulterProblemes } from './etudiant/consulter-problemes/consulter-problemes.component';
import { PublierProblemeComponent } from './etudiant/publier-probleme/publier-probleme.component';
import { RepondreProblemeComponent as EtudiantRepondreProbleme } from './etudiant/repondre-probleme/repondre-probleme.component';
import { ProfesseurHomeComponent } from './professeur/professeur-home/professeur-home.component';
import { AjouterCoursComponent as ProfesseurAjouterCours } from './professeur/ajouter-cours/ajouter-cours.component';
import { RepondreProblemeComponent as ProfesseurRepondreProbleme } from './professeur/repondre-probleme/repondre-probleme.component';
import { PublierAnnonceComponent } from './professeur/publier-annonce/publier-annonce.component';
import { ConsulterProblemesComponent as ProfesseurConsulterProblemes } from './professeur/consulter-problemes/consulter-problemes.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // Routes étudiant
  {
    path: 'etudiant/:id',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: EtudiantHomeComponent },
      { path: 'ajouter-cours', component: EtudiantAjouterCours },
      { path: 'consulter-annonces', component: EtudiantConsulterAnnonces },
      { path: 'consulter-cours', component: EtudiantConsulterCours },
      { path: 'consulter-problemes', component: EtudiantConsulterProblemes },
      { path: 'publier-probleme', component: PublierProblemeComponent },
      { path: 'repondre-probleme/:problemeId', component: EtudiantRepondreProbleme }
    ]
  },
  // Routes professeur
  {
    path: 'professeur/:id',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ProfesseurHomeComponent },
      { path: 'ajouter-cours', component: ProfesseurAjouterCours },
      { path: 'repondre-probleme/:problemeId', component: ProfesseurRepondreProbleme },
      { path: 'publier-annonce', component: PublierAnnonceComponent },
      { path: 'consulter-problemes', component: ProfesseurConsulterProblemes }
    ]
  },
  // Redirection par défaut
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Route wildcard pour les erreurs
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }