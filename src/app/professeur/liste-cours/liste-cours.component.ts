// src/app/professeur/liste-cours/liste-cours.component.ts
import { Component, OnInit } from '@angular/core';
import { ProfService } from '../../shared/services/prof-service.service';
import { Cours } from '../../shared/models/cours.model';

@Component({
  selector: 'app-liste-cours',
  standalone : false,
  templateUrl: './liste-cours.component.html'
})
export class ListeCoursComponent implements OnInit {
  cours: Cours[] = [];
  errorMessage: string = '';

  constructor(private profService: ProfService) {}

  ngOnInit() {
    this.profService.getCoursByProfesseur().subscribe({
      next: (data) => {
        this.cours = data;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur lors du chargement des cours.';
      }
    });
  }
}