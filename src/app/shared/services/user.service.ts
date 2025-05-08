import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userIdSubject = new BehaviorSubject<number | null>(null);
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    // Vérifier si on est côté client avant d'accéder à localStorage
    if (isPlatformBrowser(this.platformId)) {
      const storedId = localStorage.getItem('userId');
      const storedRole = localStorage.getItem('role');
      if (storedId) {
        this.userIdSubject.next(parseInt(storedId, 10));
      }
      if (storedRole) {
        this.userRoleSubject.next(storedRole);
      }
    }
  }

  setUser(id: number, role: string) {
    this.userIdSubject.next(id);
    this.userRoleSubject.next(role);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userId', id.toString());
      localStorage.setItem('role', role);
    }
  }

  getUserId(): Observable<number | null> {
    return this.userIdSubject.asObservable();
  }

  getUserRole(): Observable<string | null> {
    return this.userRoleSubject.asObservable();
  }

  clearUser() {
    this.userIdSubject.next(null);
    this.userRoleSubject.next(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token');
    }
  }
}