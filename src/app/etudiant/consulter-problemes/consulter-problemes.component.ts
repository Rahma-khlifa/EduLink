import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../shared/services/etudiant-service.service';
import { Probleme } from '../../shared/models/probleme.model';

@Component({
  selector: 'app-consulter-problemes',
  standalone : false ,
  templateUrl: './consulter-problemes.component.html',
  styleUrls: ['./consulter-problemes.component.css']
})
export class ConsulterProblemesComponent implements OnInit {
  problemes: Probleme[] = [];
  showReponses: { [key: number]: boolean } = {};
  reponseContenu: string = '';

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit(): void {
    this.etudiantService.getProblemesByEtudiant().subscribe({
      next: (problemes) => {
        this.problemes = problemes;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des problèmes', error);
      }
    });
  }

  toggleReponses(problemeId: number): void {
    this.showReponses[problemeId] = !this.showReponses[problemeId];
    if (this.showReponses[problemeId] && !this.problemes.find(p => p.id === problemeId)?.reponses) {
      this.etudiantService.getReponsesByProbleme(problemeId).subscribe({
        next: (reponses) => {
          const probleme = this.problemes.find(p => p.id === problemeId);
          if (probleme) {
            probleme.reponses = reponses;
          }
        },
        error: (error) => {
          console.error('Erreur lors du chargement des réponses', error);
        }
      });
    }
  }

  ajouterReponse(problemeId: number): void {
    if (this.reponseContenu.trim()) {
      this.etudiantService.addReponseToProbleme(problemeId, this.reponseContenu).subscribe({
        next: (reponse) => {
          const probleme = this.problemes.find(p => p.id === problemeId);
          if (probleme) {
            if (!probleme.reponses) {
              probleme.reponses = [];
            }
            probleme.reponses.push(reponse);
            this.reponseContenu = '';
          }
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la réponse', error);
        }
      });
    }
  }
}