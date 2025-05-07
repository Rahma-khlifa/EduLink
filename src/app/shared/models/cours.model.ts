// src/app/shared/models/cours.ts
import { Etudiant } from './etudiant.model';

export class Cours {
  id?: number;
  titre: string;
  contenu: string;
  fichierPdf?: string;
  auteur?: Etudiant;

  constructor(data: any = {}) {
    this.id = data.id;
    this.titre = data.titre || '';
    this.contenu = data.contenu || '';
    this.fichierPdf = data.fichierPdf;
    this.auteur = data.auteur ? new Etudiant(data.auteur) : undefined;
  }

  isValid(): boolean {
    return !!this.titre && !!this.contenu && !!this.auteur;
  }
}