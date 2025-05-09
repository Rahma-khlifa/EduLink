import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../shared/services/etudiant-service.service';
import { Annonce } from '../../shared/models/annonce.model';

@Component({
  selector: 'app-consulter-annonces',
  standalone: false,
  templateUrl: './consulter-annonces.component.html',
  styleUrls: ['./consulter-annonces.component.css']
})
export class ConsulterAnnoncesComponent implements OnInit {
  annonces: Annonce[] = [];
  errorMessage: string = '';

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit() {
    this.etudiantService.getAnnonces().subscribe({
      next: (data) => {
        this.annonces = data.map(annonce => new Annonce(annonce));
        console.log('Annonces récupérées : ', this.annonces);
        this.annonces.forEach(a => {
          if (!a.professeur || !a.professeur.nom) {
            a.professeur = { nom: 'Inconnu' };
          }
        });
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur lors du chargement des annonces.';
        console.error('Erreur détaillée : ', err);
      }
    });
  }
}