//prof module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProfesseurHomeComponent } from './professeur-home/professeur-home.component';
import { AjouterCoursComponent } from './ajouter-cours/ajouter-cours.component';
import { PublierAnnonceComponent } from './publier-annonce/publier-annonce.component';
import { RepondreProblemeComponent } from './repondre-probleme/repondre-probleme.component';
import { ConsulterProblemesComponent } from './consulter-problemes/consulter-problemes.component';

const professeurRoutes: Routes = [
  { path: '', component: ProfesseurHomeComponent },
  { path: 'ajouter-cours', component: AjouterCoursComponent },
  { path: 'repondre-probleme/:problemeId', component: RepondreProblemeComponent },
  { path: 'publier-annonce', component: PublierAnnonceComponent },
  { path: 'consulter-problemes', component: ConsulterProblemesComponent }
];

@NgModule({
  declarations: [
    ProfesseurHomeComponent,
    AjouterCoursComponent,
    PublierAnnonceComponent,
    RepondreProblemeComponent,
    ConsulterProblemesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(professeurRoutes)
  ],
  exports: [
    ProfesseurHomeComponent,
    AjouterCoursComponent,
    PublierAnnonceComponent,
    RepondreProblemeComponent,
    ConsulterProblemesComponent
  ]
})
export class ProfesseurModule { }
