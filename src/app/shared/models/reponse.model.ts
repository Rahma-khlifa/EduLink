export class Reponse {
  id: number;
  contenu: string;
  problemeId: number;
  professeurId: number;
  etudiantId: number;
  professeurNom?: string;
  etudiantNom?: string;

  constructor(data: Partial<Reponse> = {}) {
    this.id = data.id || 0;
    this.contenu = data.contenu || '';
    this.problemeId = data.problemeId || 0;
    this.professeurId = data.professeurId || 0;
    this.etudiantId = data.etudiantId || 0;
    this.professeurNom = data.professeurNom;
    this.etudiantNom = data.etudiantNom;
  }
}