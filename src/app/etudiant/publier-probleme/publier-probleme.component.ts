import { Component } from '@angular/core';
import { EtudiantService } from '../../shared/services/etudiant-service.service';
import { Probleme } from '../../shared/models/probleme.model';

@Component({
  selector: 'app-publier-probleme',
  standalone : false,
  templateUrl: './publier-probleme.component.html',
  styleUrls: ['./publier-probleme.component.css']
})
export class PublierProblemeComponent {
  probleme: Probleme = new Probleme();

  constructor(private etudiantService: EtudiantService) {}

  onSubmit(): void {
    this.etudiantService.publierProbleme(this.probleme).subscribe({
      next: () => {
        alert('Problème publié avec succès !');
        this.probleme = new Probleme();
      },
      error: (error) => {
        console.error('Erreur lors de la publication du problème', error);
        alert('Erreur lors de la publication du problème');
      }
    });
  }
}