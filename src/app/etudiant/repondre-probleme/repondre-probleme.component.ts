import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtudiantService } from '../../shared/services/etudiant-service.service';
import { Reponse } from '../../shared/models/reponse.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-repondre-probleme',
  standalone : false ,
  templateUrl: './repondre-probleme.component.html',
  styleUrls: ['./repondre-probleme.component.css']
})
export class RepondreProblemeComponent implements OnInit {
  problemeId: number;
  reponseForm: FormGroup;
  reponses: Reponse[] = [];
  message: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private etudiantService: EtudiantService,
    private fb: FormBuilder
  ) {
    this.problemeId = 0;
    this.reponseForm = this.fb.group({
      contenu: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Récupérer l'ID du problème depuis l'URL
    this.problemeId = +this.route.snapshot.paramMap.get('problemeId')!;
    this.loadReponses();
  }

  loadReponses(): void {
    this.etudiantService.getReponsesByProbleme(this.problemeId).subscribe({
      next: (reponses) => {
        this.reponses = reponses;
      },
      error: (error) => {
        this.message = 'Erreur lors du chargement des réponses';
        console.error(error);
      }
    });
  }

  onSubmit(): void {
    if (this.reponseForm.valid) {
      const contenu = this.reponseForm.get('contenu')?.value;
      this.etudiantService.addReponseToProbleme(this.problemeId, contenu).subscribe({
        next: (reponse) => {
          this.message = 'Réponse ajoutée avec succès !';
          this.reponses.push(reponse); // Ajouter la nouvelle réponse à la liste
          this.reponseForm.reset(); // Réinitialiser le formulaire
        },
        error: (error) => {
          this.message = 'Erreur lors de l\'ajout de la réponse';
          console.error(error);
        }
      });
    }
  }
}