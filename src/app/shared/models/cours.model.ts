import { Etudiant } from './etudiant.model';
import { Professeur } from './professeur.model';

export interface Auteur {
  id?: number;
  nom: string;
}

export class Cours {
  id?: number;
  titre: string;
  contenu: string;
  fichierPdf?: Uint8Array; // Changé de string à Uint8Array pour correspondre au byte[] du back-end
  auteur?: Auteur;

  constructor(data: any = {}) {
    this.id = data.id;
    this.titre = data.titre || '';
    this.contenu = data.contenu || '';
    this.fichierPdf = data.fichierPdf ? new Uint8Array(data.fichierPdf) : undefined; // Convertir en Uint8Array si présent
    this.auteur = data.auteur ? new Etudiant(data.auteur) : undefined;
  }

  isValid(): boolean {
    return !!this.titre && !!this.contenu && !!this.auteur;
  }
}