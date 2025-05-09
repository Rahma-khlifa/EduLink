import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Probleme } from '../../shared/models/probleme.model';
import { Reponse } from '../../shared/models/reponse.model';
import { ProfService } from '../../shared/services/prof-service.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-repondre-probleme',
  standalone: false,
  templateUrl: './repondre-probleme.component.html',
  styleUrls: ['./repondre-probleme.component.css']
})
export class RepondreProblemeComponent implements OnInit {
  problemeId: number;
  probleme: Probleme | null = null;
  reponses: Reponse[] = [];
  reponseForm: FormGroup;
  message: string | null = null;
  messageType: 'success' | 'danger' = 'success';
  currentUserId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profService: ProfService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.problemeId = Number(this.route.snapshot.paramMap.get('problemeId'));
    this.reponseForm = this.fb.group({
      contenu: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getUserId().subscribe(userId => {
      this.currentUserId = userId;
      this.loadProbleme();
      this.loadReponses();
    });
  }

  loadProbleme(): void {
    this.profService.consulterProblemes().subscribe({
      next: (problemes: Probleme[]) => {
        const probleme = problemes.find((p: Probleme) => p.id === this.problemeId);
        if (probleme) {
          this.probleme = probleme;
        } else {
          this.router.navigate(['/professeur/consulter-problemes']);
        }
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement du problème', error);
      }
    });
  }

  loadReponses(): void {
    this.profService.getReponsesByProbleme(this.problemeId).subscribe({
      next: (reponses: Reponse[]) => {
        this.reponses = reponses.map(reponse => {
          if (reponse.professeurId === this.currentUserId) {
            reponse.professeurNom = 'Professeur ' + (this.getProfesseurNom() || 'Inconnu');
          }
          return reponse;
        });
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des réponses', error);
      }
    });
  }

  getProfesseurNom(): string | null {
    // Supposons que tu aies une méthode pour obtenir le nom du professeur
    return 'Professeur Nom'; // Remplace par une vraie logique si disponible
  }

  onSubmit(): void {
    if (this.reponseForm.valid && this.currentUserId) {
      const contenu = this.reponseForm.get('contenu')?.value;
      this.profService.repondreProbleme(this.problemeId, contenu, this.currentUserId).subscribe({
        next: (reponse: Reponse) => {
          reponse.professeurId = this.currentUserId || 0;
          reponse.professeurNom = this.getProfesseurNom() || 'Inconnu';
          this.reponses.push(reponse);
          this.reponseForm.reset();
          this.message = 'Réponse ajoutée avec succès !';
          this.messageType = 'success';
        },
        error: (error: any) => {
          this.message = 'Erreur lors de l\'ajout de la réponse';
          this.messageType = 'danger';
        }
      });
    }
  }

  deleteReponse(reponseId: number): void {
    if (this.currentUserId) {
      this.profService.supprimerReponse(this.problemeId, reponseId, this.currentUserId).subscribe({
        next: () => {
          this.reponses = this.reponses.filter(r => r.id !== reponseId);
          this.message = 'Réponse supprimée avec succès !';
          this.messageType = 'success';
        },
        error: (error: any) => {
          this.message = 'Erreur lors de la suppression de la réponse';
          this.messageType = 'danger';
        }
      });
    }
  }
}