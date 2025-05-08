//methode ajouter cours 
import { Component } from '@angular/core';
import { Cours } from '../../shared/models/cours.model';
import { UserService } from '../../shared/services/user.service';
import { ProfService } from '../../shared/services/prof-service.service';

@Component({
  selector: 'app-ajouter-cours',
  standalone: false,
  templateUrl: './ajouter-cours.component.html',
  styleUrls: ['./ajouter-cours.component.css']
})
export class AjouterCoursComponent {
  cours: Cours = new Cours();
  selectedFile: File | null = null;

  constructor(private profService: ProfService, private userService: UserService) {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    this.userService.getUserId().subscribe(userId => {
      if (userId) {
        this.profService.ajouterCours(userId, this.cours.titre, this.cours.contenu, this.selectedFile!).subscribe({
          next: () => {
            alert('Cours ajouté avec succès !');
            this.cours = new Cours();
            this.selectedFile = null;
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout du cours', error);
            alert('Erreur lors de l\'ajout du cours');
          }
        });
      }
    });
  }
}