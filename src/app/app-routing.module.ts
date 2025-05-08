import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsulterAnnoncesComponent } from './etudiant/consulter-annonces/consulter-annonces.component';
import { AjouterCoursComponent as EtudiantAjouterCoursComponent } from './etudiant/ajouter-cours/ajouter-cours.component';
import { ConsulterCoursComponent } from './etudiant/consulter-cours/consulter-cours.component';
import { PublierProblemeComponent } from './etudiant/publier-probleme/publier-probleme.component';
import { RepondreProblemeComponent as EtudiantRepondreProblemeComponent } from './etudiant/repondre-probleme/repondre-probleme.component';
import { LoginComponent } from './login/login.component';
import { EtudiantHomeComponent } from './etudiant/etudiant-home/etudiant-home.component';
import { AuthGuard } from './auth.guard';
import { AjouterCoursComponent as ProfesseurAjouterCoursComponent } from './professeur/ajouter-cours/ajouter-cours.component';
import { PublierAnnonceComponent } from './professeur/publier-annonce/publier-annonce.component';
import { RepondreProblemeComponent as ProfesseurRepondreProblemeComponent } from './professeur/repondre-probleme/repondre-probleme.component';
import { ConsulterProblemesComponent as ProfesseurConsulterProblemesComponent } from './professeur/consulter-problemes/consulter-problemes.component';
import { ProfesseurHomeComponent } from './professeur/professeur-home/professeur-home.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Page initiale
  { path: 'etudiant', component: EtudiantHomeComponent, canActivate: [AuthGuard] },
  { path: 'etudiant/consulter-annonces', component: ConsulterAnnoncesComponent, canActivate: [AuthGuard] },
  { path: 'etudiant/ajouter-cours', component: EtudiantAjouterCoursComponent, canActivate: [AuthGuard] },
  { path: 'etudiant/consulter-cours', component: ConsulterCoursComponent, canActivate: [AuthGuard] },
  { path: 'etudiant/publier-probleme', component: PublierProblemeComponent, canActivate: [AuthGuard] },
  { path: 'etudiant/repondre-probleme/:problemeId', component: EtudiantRepondreProblemeComponent, canActivate: [AuthGuard] },
  { path: 'professeur', component: ProfesseurHomeComponent, canActivate: [AuthGuard] },
  { path: 'professeur/ajouter-cours', component: ProfesseurAjouterCoursComponent, canActivate: [AuthGuard] },
  { path: 'professeur/publier-annonce', component: PublierAnnonceComponent, canActivate: [AuthGuard] },
  { path: 'professeur/repondre-probleme/:problemeId', component: ProfesseurRepondreProblemeComponent, canActivate: [AuthGuard] },
  { path: 'professeur/consulter-problemes', component: ProfesseurConsulterProblemesComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' } // Redirige les routes inconnues vers la page de login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }