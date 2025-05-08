import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../shared/services/etudiant-service.service';
import { Router } from '@angular/router';
import { Cours } from '../../shared/models/cours.model';
import { Etudiant } from '../../shared/models/etudiant.model';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-ajouter-cours',
  standalone: false,
  templateUrl: './ajouter-cours.component.html'
})
export class AjouterCoursComponent implements OnInit {
  cours = new Cours();
  file: File | null = null;
  errorMessage: string = '';
  successMessage: string = ''; // Ajout pour le message de succès
  isSubmitting: boolean = false; // Ajout pour gérer l'état de soumission

  constructor(
    private etudiantService: EtudiantService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getUserId().subscribe(userId => {
      if (userId) {
        this.etudiantService.getEtudiantById(userId).subscribe({
          next: (etudiant) => {
            this.cours.auteur = etudiant;
          },
          error: (err) => {
            this.errorMessage = 'Erreur lors de la récupération des informations de l\'étudiant.';
            console.error(err);
          }
        });
      } else {
        this.errorMessage = 'Utilisateur non connecté.';
      }
    }, err => {
      this.errorMessage = 'Erreur lors de la récupération de l\'utilisateur.';
      console.error(err);
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.file = input.files[0];
    }
  }

  ajouterCours() {
    if (!this.cours.isValid()) {
      this.errorMessage = 'Le titre, le contenu et l\'auteur sont requis.';
      return;
    }

    this.isSubmitting = true; // Désactiver le bouton pendant la soumission
    this.errorMessage = ''; // Réinitialiser les messages
    this.successMessage = '';

    const formData = new FormData();
    formData.append('titre', this.cours.titre);
    formData.append('contenu', this.cours.contenu);
    if (this.file) {
      formData.append('file', this.file, this.file.name);
    }

    this.etudiantService.ajouterCoursEtudiant(formData).subscribe({
      next: (data) => {
        console.log('Cours ajouté avec succès : ', data);
        this.successMessage = 'Cours ajouté avec succès !'; // Afficher une alerte Bootstrap
        setTimeout(() => {
          this.router.navigate(['/etudiant/consulter-cours']); // Naviguer après un délai
        }, 2000); // Attendre 2 secondes pour que l'utilisateur voit le message
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur lors de l\'ajout du cours.';
        this.isSubmitting = false; // Réactiver le bouton en cas d'erreur
      },
      complete: () => {
        this.isSubmitting = false; // Réactiver le bouton après succès
      }
    });
  }
}