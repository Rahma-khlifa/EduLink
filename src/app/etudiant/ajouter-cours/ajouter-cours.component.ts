// src/app/etudiant/ajouter-cours/ajouter-cours.component.ts
import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../shared/services/etudiant-service.service';
import { Router } from '@angular/router';
import { Cours } from '../../shared/models/cours.model';
import { Etudiant } from '../../shared/models/etudiant.model';

@Component({
  selector: 'app-ajouter-cours',
  standalone: false,
  templateUrl: './ajouter-cours.component.html'
})
export class AjouterCoursComponent implements OnInit {
  cours = new Cours();
  file: File | null = null;
  errorMessage: string = '';
  etudiants: Etudiant[] = [];

  constructor(
    private etudiantService: EtudiantService,
    private router: Router
  ) {}

  ngOnInit() {
    this.etudiantService.getAllEtudiants().subscribe({
      next: (data) => {
        this.etudiants = data;
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
    this.etudiantService.ajouterCoursEtudiant(formData).subscribe({
      next: () => {
        alert('Cours ajouté !');
        this.router.navigate(['/etudiant/consulter-annonces']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur lors de l\'ajout du cours.';
      }
    });
  }
}