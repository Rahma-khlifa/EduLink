// src/app/professeur/ajouter-cours/ajouter-cours.component.ts
import { Component, OnInit } from '@angular/core';
import { ProfService } from '../../shared/services/prof-service.service';
import { Router } from '@angular/router';
import { Cours} from '../../shared/models/cours.model';
import { Etudiant } from '../../shared/models/etudiant.model';

@Component({
  selector: 'app-ajouter-cours',
  standalone : false ,
  templateUrl: './ajouter-cours.component.html'
})
export class AjouterCoursComponent implements OnInit {
  cours = new Cours();
  file: File | null = null;
  errorMessage: string = '';
  etudiants: Etudiant[] = [];

  constructor(
    private profService: ProfService,
    private router: Router
  ) {}

  ngOnInit() {
    // Note : On utilise EtudiantService pour charger les étudiants, car les profs n'ont pas accès direct
    // Si ton backend a un endpoint spécifique, on peut l'ajouter ici
    this.profService.getAllProfesseurs().subscribe({
      next: (data) => {
        // Simule des étudiants pour l'exemple
        this.etudiants = data.map(prof => new Etudiant({ id: prof.id, nom: prof.nom, email: prof.email }));
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des étudiants.';
      }
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
    const formData = new FormData();
    formData.append('titre', this.cours.titre);
    formData.append('contenu', this.cours.contenu);
    if (this.file) {
      formData.append('fichierPdf', this.file);
    }
    if (this.cours.auteur) {
      formData.append('auteur', JSON.stringify(this.cours.auteur));
    }
    this.profService.ajouterCoursProfesseur(formData).subscribe({
      next: () => {
        alert('Cours ajouté !');
        this.router.navigate(['/professeur/liste-cours']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur lors de l\'ajout du cours.';
      }
    });
  }
}