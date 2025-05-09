import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Cours } from '../models/cours.model';
import { Probleme } from '../models/probleme.model';
import { Reponse } from '../models/reponse.model';
import { RendezVous } from '../models/rendez-vous.model';
import { Annonce } from '../models/annonce.model';
import { Etudiant } from '../models/etudiant.model';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private baseUrl = 'http://localhost:8080/api/etudiants';

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

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
    return this.getUserId().pipe(
      switchMap(userId => this.http.post<Cours>(`${this.baseUrl}/${userId}/cours`, cours, {
        reportProgress: true,
        observe: 'events'
      }).pipe(
        map(data => new Cours(data))
      ))
    );
  }

  getAllCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.baseUrl}/cours`).pipe( // Changé pour récupérer tous les cours
      map(data => data.map(item => new Cours(item))),
      catchError(err => {
        console.error('Erreur lors de la récupération des cours : ', err);
        return throwError(err);
      })
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
    return this.getUserId().pipe(
      switchMap(userId => this.http.post<Probleme>(`${this.baseUrl}/${userId}/problemes`, probleme).pipe(
        map(data => new Probleme(data))
      ))
    );
  }

  getAllProblemes(): Observable<Probleme[]> { // Nouvelle méthode pour tous les problèmes
    return this.http.get<Probleme[]>(`${this.baseUrl}/problemes`).pipe(
      map(data => data.map(item => new Probleme(item))),
      catchError(err => {
        console.error('Erreur lors de la récupération des problèmes : ', err);
        return throwError(err);
      })
    );
  }

  getProblemesByEtudiant(): Observable<Probleme[]> {
    return this.getUserId().pipe(
      switchMap(userId => this.http.get<Probleme[]>(`${this.baseUrl}/${userId}/problemes`).pipe(
        map(data => data.map(item => new Probleme(item)))
      ))
    );
  }

  addReponseToProbleme(problemeId: number, contenu: string): Observable<Reponse> {
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
    return this.getUserId().pipe(
      switchMap(userId => this.http.post<RendezVous>(`${this.baseUrl}/${userId}/rendez-vous`, rendezVous).pipe(
        map(data => new RendezVous(data))
      ))
    );
  }

  getRendezVousByEtudiant(): Observable<RendezVous[]> {
    return this.getUserId().pipe(
      switchMap(userId => this.http.get<RendezVous[]>(`${this.baseUrl}/${userId}/rendez-vous`).pipe(
        map(data => data.map(item => new RendezVous(item)))
      ))
    );
  }

  getAnnonces(): Observable<Annonce[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Annonce[]>(`${this.baseUrl}/annonces`, { headers }).pipe(
      map(data => data.map(item => new Annonce(item)))
    );
  }

  logoutEtudiant(): Observable<void> {
    return this.getUserId().pipe(
      switchMap(userId => this.http.post<void>(`${this.baseUrl}/${userId}/logout`, null))
    );
  }
}