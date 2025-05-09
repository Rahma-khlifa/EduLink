import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtudiantService } from '../../shared/services/etudiant-service.service';
import { Reponse } from '../../shared/models/reponse.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-repondre-probleme',
  standalone: false,
  templateUrl: './repondre-probleme.component.html',
  styleUrls: ['./repondre-probleme.component.css']
})
export class RepondreProblemeComponent implements OnInit {
  problemeId: number;
  reponseForm: FormGroup;
  reponses: Reponse[] = [];
  message: string | null = null;
  currentUserId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private etudiantService: EtudiantService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.problemeId = 0;
    this.reponseForm = this.fb.group({
      contenu: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getUserId().subscribe(userId => {
      this.currentUserId = userId;
      this.problemeId = +this.route.snapshot.paramMap.get('problemeId')!;
      this.loadReponses();
    });
  }

  loadReponses(): void {
    this.etudiantService.getReponsesByProbleme(this.problemeId).subscribe({
      next: (reponses) => {
        this.reponses = reponses.map(reponse => {
          if (reponse.etudiantId === this.currentUserId) {
            reponse.etudiantNom = 'Étudiant ' + (this.currentUserId || 'Inconnu');
          }
          return reponse;
        });
      },
      error: (error) => {
        this.message = 'Erreur lors du chargement des réponses';
        console.error(error);
      }
    });
  }

  onSubmit(): void {
    if (this.reponseForm.valid && this.currentUserId) {
      const contenu = this.reponseForm.get('contenu')?.value;
      this.etudiantService.addReponseToProbleme(this.problemeId, contenu, this.currentUserId).subscribe({
        next: (reponse) => {
          reponse.etudiantId = this.currentUserId || 0;
          reponse.etudiantNom = 'Étudiant ' + (this.currentUserId || 'Inconnu');
          this.reponses.push(reponse);
          this.reponseForm.reset();
          this.message = 'Réponse ajoutée avec succès !';
        },
        error: (error) => {
          this.message = 'Erreur lors de l\'ajout de la réponse';
          console.error(error);
        }
      });
    }
  }

  deleteReponse(reponseId: number): void {
    if (this.currentUserId) {
      this.etudiantService.supprimerReponse(this.problemeId, reponseId, this.currentUserId).subscribe({
        next: () => {
          this.reponses = this.reponses.filter(r => r.id !== reponseId);
          this.message = 'Réponse supprimée avec succès !';
        },
        error: (error) => {
          this.message = 'Erreur lors de la suppression de la réponse';
          console.error(error);
        }
      });
    }
  }
}