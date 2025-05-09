import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../shared/services/etudiant-service.service';
import { Probleme } from '../../shared/models/probleme.model';
import { UserService } from '../../shared/services/user.service';
import { Reponse } from '../../shared/models/reponse.model';

@Component({
  selector: 'app-consulter-problemes',
  standalone: false,
  templateUrl: './consulter-problemes.component.html',
  styleUrls: ['./consulter-problemes.component.css']
})
export class ConsulterProblemesComponent implements OnInit {
  problemes: Probleme[] = [];
  showReponses: { [key: number]: boolean } = {};
  reponseContenu: string = '';
  currentUserId: number | null = null;

  constructor(
    private etudiantService: EtudiantService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserId().subscribe(userId => {
      if (userId) {
        this.currentUserId = userId;
        this.etudiantService.getAllProblemes().subscribe({
          next: (problemes) => {
            this.problemes = problemes.map(probleme => {
              if (probleme.etudiantId && !probleme.etudiant) {
                this.etudiantService.getEtudiantById(probleme.etudiantId).subscribe({
                  next: (etudiant) => (probleme.etudiant = etudiant),
                  error: (err) => console.error('Erreur chargement étudiant', err)
                });
              }
              return probleme;
            });
          },
          error: (error) => {
            console.error('Erreur lors du chargement des problèmes', error);
          }
        });
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
    if (this.reponseContenu.trim() && this.currentUserId) {
      this.etudiantService.addReponseToProbleme(problemeId, this.reponseContenu, this.currentUserId).subscribe({
        next: (reponse) => {
          const probleme = this.problemes.find(p => p.id === problemeId);
          if (probleme) {
            if (!probleme.reponses) {
              probleme.reponses = [];
            }
            reponse.etudiantId = this.currentUserId || 0;
            reponse.etudiantNom = 'Étudiant ' + this.currentUserId; // À ajuster si tu as une méthode pour récupérer le nom
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

  canDeleteReponse(probleme: Probleme, reponse: Reponse): boolean {
    return this.currentUserId === reponse.etudiantId;
  }

}