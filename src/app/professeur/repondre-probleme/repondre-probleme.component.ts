import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Probleme } from '../../shared/models/probleme.model';
import { Reponse } from '../../shared/models/reponse.model';
import { ProfService } from '../../shared/services/prof-service.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profService: ProfService,
    private fb: FormBuilder
  ) {
    this.problemeId = Number(this.route.snapshot.paramMap.get('problemeId'));
    this.reponseForm = this.fb.group({
      contenu: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProbleme();
    this.loadReponses();
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
        this.reponses = reponses;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des réponses', error);
      }
    });
  }

  onSubmit(): void {
    if (this.reponseForm.valid) {
      const contenu = this.reponseForm.get('contenu')?.value;
      this.profService.repondreProbleme(this.problemeId, contenu).subscribe({
        next: (reponse: Reponse) => {
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
}