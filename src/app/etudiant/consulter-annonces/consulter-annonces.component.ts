// src/app/etudiant/consulter-annonces/consulter-annonces.component.ts
import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../shared/services/etudiant-service.service';
import { Annonce } from '../../shared/models/annonce.model';

@Component({
  selector: 'app-consulter-annonces',
  standalone: false,
  templateUrl: './consulter-annonces.component.html'
})
export class ConsulterAnnoncesComponent implements OnInit {
  annonces: Annonce[] = [];
  errorMessage: string = '';

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit() {
    this.etudiantService.getAnnonces().subscribe({
      next: (data) => {
        this.annonces = data;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur lors du chargement des annonces.';
      }
    });
  }
}