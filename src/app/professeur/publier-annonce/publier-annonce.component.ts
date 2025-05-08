import { Component } from '@angular/core';
import { Annonce } from '../../shared/models/annonce.model';
import { UserService } from '../../shared/services/user.service';
import { ProfService } from '../../shared/services/prof-service.service';

@Component({
  selector: 'app-publier-annonce',
  standalone: false,
  templateUrl: './publier-annonce.component.html',
  styleUrls: ['./publier-annonce.component.css']
})
export class PublierAnnonceComponent {
  annonce: Annonce = new Annonce();

  constructor(private profService: ProfService, private userService: UserService) {}

  onSubmit(): void {
    this.userService.getUserId().subscribe(userId => {
      if (userId) {
        this.profService.publierAnnonce(this.annonce.titre, this.annonce.contenu).subscribe({
          next: () => {
            alert('Annonce publiée avec succès !');
            this.annonce = new Annonce();
          },
          error: (error) => {
            console.error('Erreur lors de la publication de l\'annonce', error);
            alert('Erreur lors de la publication de l\'annonce');
          }
        });
      }
    });
  }
}