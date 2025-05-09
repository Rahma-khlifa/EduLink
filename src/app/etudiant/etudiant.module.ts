//etudiant module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantHomeComponent } from './etudiant-home/etudiant-home.component';
import { AjouterCoursComponent } from './ajouter-cours/ajouter-cours.component';
import { ConsulterAnnoncesComponent } from './consulter-annonces/consulter-annonces.component';
import { ConsulterCoursComponent } from './consulter-cours/consulter-cours.component';
import { ConsulterProblemesComponent } from './consulter-problemes/consulter-problemes.component';
import { PublierProblemeComponent } from './publier-probleme/publier-probleme.component';
import { RepondreProblemeComponent } from './repondre-probleme/repondre-probleme.component';

const etudiantRoutes: Routes = [
  { path: '', component: EtudiantHomeComponent },
  { path: 'ajouter-cours', component: AjouterCoursComponent },
  { path: 'consulter-annonces', component: ConsulterAnnoncesComponent },
  { path: 'consulter-cours', component: ConsulterCoursComponent },
  { path: 'consulter-problemes', component: ConsulterProblemesComponent },
  { path: 'publier-probleme', component: PublierProblemeComponent },
  { path: 'repondre-probleme/:problemeId', component: RepondreProblemeComponent }
];

@NgModule({
  declarations: [
    EtudiantHomeComponent,
    AjouterCoursComponent,
    ConsulterAnnoncesComponent,
    ConsulterCoursComponent,
    ConsulterProblemesComponent,
    PublierProblemeComponent,
    RepondreProblemeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(etudiantRoutes)
  ],
  exports: [
    EtudiantHomeComponent,
    AjouterCoursComponent,
    ConsulterAnnoncesComponent,
    ConsulterCoursComponent,
    ConsulterProblemesComponent,
    PublierProblemeComponent,
    RepondreProblemeComponent
  ]
})
export class EtudiantModule { }