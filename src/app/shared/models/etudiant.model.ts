
// src/app/shared/models/etudiant.ts
export class Etudiant {
    id?: number;
    nom: string;
    email: string;
    motDePasse?: string;
    niveauEtude?: string;
    filiere?: string;
  
    constructor(data: Partial<Etudiant> = {}) {
      this.id = data.id;
      this.nom = data.nom || '';
      this.email = data.email || '';
      this.motDePasse = data.motDePasse;
      this.niveauEtude = data.niveauEtude;
      this.filiere = data.filiere;
    }
  
    isValid(): boolean {
      return !!this.nom && !!this.email && !!this.motDePasse;
    }
  }