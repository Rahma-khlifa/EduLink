// src/app/shared/models/probleme.model.ts
import { Reponse } from './reponse.model';


export class Probleme {
  id: number;
  titre: string;
  description: string;
  etudiantId: number;
  reponses?: Reponse[];

  constructor(data: Partial<Probleme> = {}) {
    this.id = data.id || 0;
    this.titre = data.titre || '';
    this.description = data.description || '';
    this.etudiantId = data.etudiantId || 0;
    this.reponses = data.reponses || [];
  }
  hasReponses(): boolean {
    return !!this.reponses && this.reponses.length > 0;
  }

  isValid(): boolean {
    return !!this.titre && !!this.description;
  }
}

  
