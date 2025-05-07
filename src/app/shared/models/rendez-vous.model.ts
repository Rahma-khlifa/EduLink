// src/app/shared/models/rendez-vous.ts
import { Etudiant } from './etudiant.model';
import { Professeur } from './professeur.model';

export class RendezVous {
  id?: number;
  motif: string;
  date?: string; // Pour LocalDateTime (ex. "2025-05-05T10:00:00")
  professeurId?: number;
  etudiantId?: number;
  professeur?: Professeur;
  etudiant?: Etudiant;

  constructor(data: Partial<RendezVous> = {}) {
    this.id = data.id;
    this.motif = data.motif || '';
    this.date = data.date;
    this.professeurId = data.professeurId;
    this.etudiantId = data.etudiantId;
    this.professeur = data.professeur ? new Professeur(data.professeur) : undefined;
    this.etudiant = data.etudiant ? new Etudiant(data.etudiant) : undefined;
  }

  isValid(): boolean {
    return !!this.motif && !!this.date && !!this.professeurId && !!this.etudiantId;
  }
}
