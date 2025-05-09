import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../shared/services/etudiant-service.service';
import { Cours, Auteur } from '../../shared/models/cours.model';

@Component({
  selector: 'app-consulter-cours',
  standalone: false,
  templateUrl: './consulter-cours.component.html',
  styleUrls: ['./consulter-cours.component.css']
})
export class ConsulterCoursComponent implements OnInit {
  cours: Cours[] = [];
  errorMessage: string = '';

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit() {
    console.log('Appel à getAllCours avec URL : ', `${this.etudiantService['baseUrl']}/cours`);
    this.etudiantService.getAllCours().subscribe({
      next: (data) => {
        this.cours = data;
        console.log('Cours récupérés : ', this.cours);
        // Fallback si l'auteur est manquant
        this.cours.forEach(c => {
          if (!c.auteur) {
            c.auteur = { nom: 'Inconnu' };
          }
        });
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur lors du chargement des cours.';
        console.error('Erreur détaillée : ', err);
      }
    });
  }

  downloadPdf(cours: Cours) {
    if (cours.fichierPdf) {
      const blob = new Blob([cours.fichierPdf], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `cours_${cours.id}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } else {
      alert('Aucun fichier PDF disponible.');
    }
  }
}