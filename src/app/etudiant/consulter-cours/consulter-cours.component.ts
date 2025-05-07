// src/app/etudiant/consulter-cours/consulter-cours.component.ts
import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../shared/services/etudiant-service.service';
import { Cours } from '../../shared/models/cours.model';

@Component({
  selector: 'app-consulter-cours',
  standalone: false,
  templateUrl: './consulter-cours.component.html'
})
export class ConsulterCoursComponent implements OnInit {
  cours: Cours[] = [];
  errorMessage: string = '';

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit() {
    this.etudiantService.getAllCours().subscribe({
      next: (data) => {
        this.cours = data;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur lors du chargement des cours.';
      }
    });
  }
}