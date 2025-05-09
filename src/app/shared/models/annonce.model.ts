// src/app/shared/models/annonce.ts
import { Professeur } from './professeur.model';

export class Annonce {
  id?: number;
  titre: string = '';
  contenu: string = '';
  datePublication?: string; // Format YYYY-MM-DD
  professeurId?: number;
  professeur?: Partial<Professeur>;

  constructor(data: Partial<Annonce> = {}) {
    this.id = data.id;
    this.titre = data.titre || '';
    this.contenu = data.contenu || '';
    this.datePublication = data.datePublication;
    this.professeurId = data.professeurId;
    this.professeur = data.professeur;
  }

  isValid(): boolean {
    return !!this.titre && !!this.contenu;
  }
}