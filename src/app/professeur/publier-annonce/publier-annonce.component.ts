import { Component, OnInit } from '@angular/core';
import { Annonce } from '../../shared/models/annonce.model';
import { UserService } from '../../shared/services/user.service';
import { ProfService } from '../../shared/services/prof-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publier-annonce',
  standalone: false,
  templateUrl: './publier-annonce.component.html',
  styleUrls: ['./publier-annonce.component.css']
})
export class PublierAnnonceComponent implements OnInit {
  annonce: Annonce = new Annonce();
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;
  auteurNom: string = 'Utilisateur connecté'; // Pour afficher le nom du professeur

  constructor(
    private profService: ProfService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserId().subscribe(userId => {
      if (userId) {
        this.annonce.professeurId = userId;
        this.profService.getProfesseurById(userId).subscribe({
          next: (professeur) => {
            this.auteurNom = professeur.nom || 'Utilisateur connecté';
            this.annonce.professeur = professeur;
          },
          error: (err) => {
            this.errorMessage = 'Erreur lors de la récupération des informations du professeur.';
            console.error(err);
          }
        });
      } else {
        this.errorMessage = 'Utilisateur non connecté.';
      }
    });
  }

  onSubmit(): void {
    if (!this.annonce.titre || !this.annonce.contenu) {
      this.errorMessage = 'Le titre et le contenu sont requis.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.profService.publierAnnonce(this.annonce.titre, this.annonce.contenu).subscribe({
      next: (data) => {
        this.annonce = new Annonce(data);
        this.successMessage = 'Annonce publiée avec succès !';
        setTimeout(() => {
          this.router.navigate(['/professeur']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Erreur lors de la publication de l\'annonce.';
        this.isSubmitting = false;
        console.error('Erreur lors de la publication de l\'annonce', error);
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}