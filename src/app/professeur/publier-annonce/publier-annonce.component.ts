// src/app/professeur/publier-annonce/publier-annonce.component.ts
import { Component } from '@angular/core';
import { ProfService } from '../../shared/services/prof-service.service';
import { Router } from '@angular/router';
import { Annonce } from '../../shared/models/annonce.model';

@Component({
  selector: 'app-publier-annonce',
  standalone : false ,
  templateUrl: './publier-annonce.component.html'
})
export class PublierAnnonceComponent {
  annonce = new Annonce();
  errorMessage: string = '';

  constructor(private profService: ProfService, private router: Router) {}

  publierAnnonce() {
    if (!this.annonce.isValid()) {
      this.errorMessage = 'Le titre, le contenu et la date de publication sont requis.';
      return;
    }
    this.annonce.professeurId = 1; // ID statique
    this.profService.publierAnnonce(this.annonce).subscribe({
      next: () => {
        alert('Annonce publiée !');
        this.router.navigate(['/professeur']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur lors de la publication de l\'annonce.';
      }
    });
  }
}