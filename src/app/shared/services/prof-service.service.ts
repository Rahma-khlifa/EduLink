// src/app/shared/services/prof.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cours } from '../models/cours.model';
import { Probleme } from '../models/probleme.model';
import { Reponse } from '../models/reponse.model';
import { RendezVous } from '../models/rendez-vous.model';
import { Annonce } from '../models/annonce.model';
import { Professeur} from '../models/professeur.model';

@Injectable({
  providedIn: 'root'
})
export class ProfService {
  private baseUrl = 'http://localhost:8080/api/professeur';
  private userId = 1; // ID statique pour tester sans authentification

  constructor(private http: HttpClient) {}

  createProfesseur(professeur: Professeur): Observable<Professeur> {
    return this.http.post<Professeur>(`${this.baseUrl}`, professeur).pipe(
      map(data => new Professeur(data))
    );
  }

  getProfesseurById(id: number): Observable<Professeur> {
    return this.http.get<Professeur>(`${this.baseUrl}/${id}`).pipe(
      map(data => new Professeur(data))
    );
  }

  getAllProfesseurs(): Observable<Professeur[]> {
    return this.http.get<Professeur[]>(`${this.baseUrl}`).pipe(
      map(data => data.map(item => new Professeur(item)))
    );
  }

  ajouterCoursProfesseur(cours: FormData): Observable<Cours> {
    return this.http.post<Cours>(`${this.baseUrl}/${this.userId}/cours`, cours).pipe(
      map(data => new Cours(data))
    );
  }

  getCoursByProfesseur(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.baseUrl}/${this.userId}/cours`).pipe(
      map(data => data.map(item => new Cours(item)))
    );
  }

  consulterProblemes(): Observable<Probleme[]> {
    return this.http.get<Probleme[]>(`${this.baseUrl}/problemes`).pipe(
      map(data => data.map(item => new Probleme(item)))
    );
  }

  repondreProbleme(problemeId: number, contenu: string): Observable<Reponse> {
    return this.http.post<Reponse>(`${this.baseUrl}/${this.userId}/problemes/${problemeId}/reponses`, { contenu }).pipe(
      map(data => new Reponse(data))
    );
  }

  publierAnnonce(annonce: Annonce): Observable<Annonce> {
    return this.http.post<Annonce>(`${this.baseUrl}/${this.userId}/annonces`, annonce).pipe(
      map(data => new Annonce(data))
    );
  }

  getReponsesByProbleme(problemeId: number): Observable<Reponse[]> {
    return this.http.get<Reponse[]>(`${this.baseUrl}/problemes/${problemeId}/reponses`).pipe(
      map(data => data.map(item => new Reponse(item)))
    );
  }
}