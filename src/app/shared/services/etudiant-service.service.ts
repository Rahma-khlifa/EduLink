import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Cours } from '../models/cours.model';
import { Probleme } from '../models/probleme.model';
import { Reponse } from '../models/reponse.model';
import { RendezVous } from '../models/rendez-vous.model';
import { Annonce } from '../models/annonce.model';
import { Etudiant } from '../models/etudiant.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private baseUrl = 'http://localhost:8080/api/etudiants'; // Corrigé
  private userId = 1; // ID statique pour tester

  constructor(private http: HttpClient) {}

  createEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(`${this.baseUrl}`, etudiant).pipe(
      map(data => new Etudiant(data))
    );
  }

  getEtudiantById(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.baseUrl}/${id}`).pipe(
      map(data => new Etudiant(data))
    );
  }

  getAllEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.baseUrl}`).pipe(
      map(data => data.map(item => new Etudiant(item)))
    );
  }

  ajouterCoursEtudiant(cours: FormData): Observable<Cours> {
    return this.http.post<Cours>(`${this.baseUrl}/${this.userId}/cours`, cours).pipe(
      map(data => new Cours(data))
    );
  }

  getAllCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.baseUrl}/cours`).pipe(
      map(data => data.map(item => new Cours(item)))
    );
  }

  getCoursById(coursId: number): Observable<Cours> {
    return this.http.get<Cours>(`${this.baseUrl}/cours/${coursId}`).pipe(
      map(data => new Cours(data))
    );
  }

  getCoursByTitre(titre: string): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.baseUrl}/cours/titre/${titre}`).pipe(
      map(data => data.map(item => new Cours(item)))
    );
  }

  supprimerCours(coursId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/cours/${coursId}`);
  }

  publierProbleme(probleme: Probleme): Observable<Probleme> {
    return this.http.post<Probleme>(`${this.baseUrl}/${this.userId}/problemes`, probleme).pipe(
      map(data => new Probleme(data))
    );
  }

  getProblemesByEtudiant(): Observable<Probleme[]> {
    return this.http.get<Probleme[]>(`${this.baseUrl}/${this.userId}/problemes`).pipe(
      map(data => data.map(item => new Probleme(item)))
    );
  }

  addReponseToProbleme(problemeId: number, contenu: string): Observable<Reponse> {
    const formData = new FormData();
    formData.append('contenu', contenu);
    return this.http.post<Reponse>(`${this.baseUrl}/${this.userId}/problemes/${problemeId}/reponses`, formData).pipe(
      map(data => new Reponse(data)),
      catchError(error => {
        console.error('Erreur lors de l\'ajout de la réponse', error);
        return throwError(error);
      })
    );
  }

  getReponsesByProbleme(problemeId: number): Observable<Reponse[]> {
    return this.http.get<Reponse[]>(`${this.baseUrl}/problemes/${problemeId}/reponses`).pipe(
      map(data => data.map(item => new Reponse(item))),
      catchError(error => {
        console.error('Erreur lors de la récupération des réponses', error);
        return throwError(error);
      })
    );
  }

  demanderRendezVous(rendezVous: RendezVous): Observable<RendezVous> {
    return this.http.post<RendezVous>(`${this.baseUrl}/${this.userId}/rendez-vous`, rendezVous).pipe(
      map(data => new RendezVous(data))
    );
  }

  getRendezVousByEtudiant(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.baseUrl}/${this.userId}/rendez-vous`).pipe(
      map(data => data.map(item => new RendezVous(item)))
    );
  }

  getAnnonces(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.baseUrl}/annonces`).pipe(
      map(data => data.map(item => new Annonce(item)))
    );
  }
}