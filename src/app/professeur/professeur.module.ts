import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublierAnnonceComponent } from './publier-annonce/publier-annonce.component';

import { AjouterCoursComponent } from './ajouter-cours/ajouter-cours.component';
import { ListeCoursComponent } from './liste-cours/liste-cours.component';



@NgModule({
  declarations: [
    PublierAnnonceComponent,
   
    AjouterCoursComponent,
    ListeCoursComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProfesseurModule { }
