// src/app/shared/models/annonce.ts
import { Professeur } from './professeur.model';

export class Annonce {
  id?: number;
  titre: string;
  contenu: string;
  datePublication?: string; // Pour LocalDate (ex. "2025-05-01")
  professeurId?: number;
  professeur?: Professeur;

  constructor(data: Partial<Annonce> = {}) {
    this.id = data.id;
    this.titre = data.titre || '';
    this.contenu = data.contenu || '';
    this.datePublication = data.datePublication;
    this.professeurId = data.professeurId;
    this.professeur = data.professeur ? new Professeur(data.professeur) : undefined;
  }

  isValid(): boolean {
    return !!this.titre && !!this.contenu && !!this.datePublication;
  }
}