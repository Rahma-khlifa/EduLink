// src/app/shared/models/professeur.ts
export class Professeur {
    id?: number;
    nom: string;
    email: string;
    motDePasse?: string;
  
    constructor(data: Partial<Professeur> = {}) {
      this.id = data.id;
      this.nom = data.nom || '';
      this.email = data.email || '';
      this.motDePasse = data.motDePasse;
    }
  
    isValid(): boolean {
      return !!this.nom && !!this.email && !!this.motDePasse;
    }
}