import { Component, OnInit } from '@angular/core';
import { Probleme } from '../../shared/models/probleme.model';
import { UserService } from '../../shared/services/user.service';
import { ProfService } from '../../shared/services/prof-service.service';
import { EtudiantService } from '../../shared/services/etudiant-service.service';

@Component({
  selector: 'app-consulter-problemes',
  standalone: false,
  templateUrl: './consulter-problemes.component.html',
  styleUrls: ['./consulter-problemes.component.css']
})
export class ConsulterProblemesComponent implements OnInit {
  problemes: Probleme[] = [];
  showReponses: { [key: number]: boolean } = {};
  currentUserId: number | null = null;

  constructor(
    private profService: ProfService,
    private userService: UserService,
    private etudiantService: EtudiantService
  ) {}

  ngOnInit(): void {
    this.userService.getUserId().subscribe(userId => {
      if (userId) {
        this.currentUserId = userId;
        this.profService.consulterProblemes(userId).subscribe({
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
  }

  canDeleteReponse(probleme: Probleme, reponse: any): boolean {
    return this.currentUserId === reponse.professeurId;
  }

}