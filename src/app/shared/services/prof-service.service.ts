import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Cours } from '../models/cours.model';
import { Probleme } from '../models/probleme.model';
import { Reponse } from '../models/reponse.model';
import { RendezVous } from '../models/rendez-vous.model';
import { Annonce } from '../models/annonce.model';
import { Professeur } from '../models/professeur.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfService {
  private baseUrl = 'http://localhost:8080/api/professeurs';

  constructor(private http: HttpClient, private userService: UserService) {}

  private getUserId(): Observable<number> {
    return this.userService.getUserId().pipe(
      map(id => {
        if (id === null || isNaN(id)) {
          throw new Error('Utilisateur non connecté ou ID invalide');
        }
        return id;
      })
    );
  }

  createProfesseur(professeur: Professeur): Observable<Professeur> {
    return this.http.post<Professeur>(`${this.baseUrl}`, professeur).pipe(
      map(data => new Professeur(data))
    );
  }

  getProfesseurById(id: number): Observable<Professeur> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Professeur>(`${this.baseUrl}/${id}`, { headers }).pipe(
      map(data => new Professeur(data))
    );
  }

  getAllProfesseurs(): Observable<Professeur[]> {
    return this.http.get<Professeur[]>(`${this.baseUrl}/tous`).pipe(
      map(data => data.map(item => new Professeur(item)))
    );
  }

  ajouterCours(professeurId: number, titre: string, contenu: string, file: File | null): Observable<Cours> {
    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('contenu', contenu);
    if (file) {
      formData.append('file', file, file.name);
    }
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Cours>(`${this.baseUrl}/${professeurId}/cours`, formData, { headers }).pipe(
      map(data => new Cours(data))
    );
  }

  getCoursByProfesseur(): Observable<Cours[]> {
    return this.getUserId().pipe(
      switchMap(userId => this.http.get<Cours[]>(`${this.baseUrl}/${userId}/cours`).pipe(
        map(data => data.map(item => new Cours(item)))
      ))
    );
  }

  consulterProblemes(professeurId?: number): Observable<Probleme[]> {
    if (professeurId) {
      return this.http.get<Probleme[]>(`${this.baseUrl}/${professeurId}/problemes`).pipe(
        map(data => data.map(item => new Probleme(item)))
      );
    }
    return this.http.get<Probleme[]>(`${this.baseUrl}/problemes`).pipe(
      map(data => data.map(item => new Probleme(item)))
    );
  }

  repondreProbleme(problemeId: number, contenu: string): Observable<Reponse> {
    const formData = new FormData();
    formData.append('contenu', contenu);
    return this.getUserId().pipe(
      switchMap(userId => this.http.post<Reponse>(`${this.baseUrl}/${userId}/problemes/${problemeId}/reponses`, formData).pipe(
        map(data => new Reponse(data)),
        catchError(error => {
          console.error('Erreur lors de l\'ajout de la réponse', error);
          return throwError(error);
        })
      ))
    );
  }

  publierAnnonce(titre: string, contenu: string): Observable<Annonce> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.getUserId().pipe(
      switchMap(userId => this.http.post<Annonce>(`${this.baseUrl}/${userId}/annonces`, { titre, contenu }, { headers }).pipe(
        map(data => new Annonce(data))
      ))
    );
  }

  getAllAnnonces(): Observable<Annonce[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Annonce[]>(`${this.baseUrl}/annonces`, { headers }).pipe(
      map(data => data.map(item => new Annonce(item)))
    );
  }

  getAnnoncesByProfesseur(): Observable<Annonce[]> {
    return this.getUserId().pipe(
      switchMap(userId => this.http.get<Annonce[]>(`${this.baseUrl}/${userId}/annonces`).pipe(
        map(data => data.map(item => new Annonce(item)))
      ))
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

  organiserRdv(etudiantId: number, sujet: string): Observable<RendezVous> {
    return this.getUserId().pipe(
      switchMap(userId => this.http.post<RendezVous>(`${this.baseUrl}/${userId}/rendez-vous`, { etudiantId, sujet }).pipe(
        map(data => new RendezVous(data))
      ))
    );
  }

  updateRendezVousStatus(rdvId: number, status: string): Observable<RendezVous> {
    return this.http.put<RendezVous>(`${this.baseUrl}/rendez-vous/${rdvId}/status`, null, { params: { status } }).pipe(
      map(data => new RendezVous(data))
    );
  }

  getRendezVousByProfesseur(): Observable<RendezVous[]> {
    return this.getUserId().pipe(
      switchMap(userId => this.http.get<RendezVous[]>(`${this.baseUrl}/${userId}/rendez-vous`).pipe(
        map(data => data.map(item => new RendezVous(item)))
      ))
    );
  }

  logoutProfesseur(): Observable<void> {
    return this.getUserId().pipe(
      switchMap(userId => this.http.post<void>(`${this.baseUrl}/${userId}/logout`, null))
    );
  }
}