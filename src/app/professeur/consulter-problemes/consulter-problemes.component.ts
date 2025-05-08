import { Component, OnInit } from '@angular/core';
import { Probleme } from '../../shared/models/probleme.model';
import { UserService } from '../../shared/services/user.service';
import { ProfService } from '../../shared/services/prof-service.service';

@Component({
  selector: 'app-consulter-problemes',
  standalone: false,
  templateUrl: './consulter-problemes.component.html',
  styleUrls: ['./consulter-problemes.component.css']
})
export class ConsulterProblemesComponent implements OnInit {
  problemes: Probleme[] = [];
  showReponses: { [key: number]: boolean } = {};

  constructor(private profService: ProfService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserId().subscribe(userId => {
      if (userId) {
        this.profService.consulterProblemes(userId).subscribe({
          next: (problemes) => {
            this.problemes = problemes;
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
}