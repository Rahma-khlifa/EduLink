import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showSignInEtudiant: boolean = false;
  showSignUpEtudiant: boolean = false;
  showSignInProfesseur: boolean = false;
  showSignUpProfesseur: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  toggleSignInEtudiant() {
    this.showSignInEtudiant = !this.showSignInEtudiant;
    if (this.showSignInEtudiant) {
      this.showSignUpEtudiant = false;
      this.showSignInProfesseur = false;
      this.showSignUpProfesseur = false;
      this.errorMessage = null;
      this.successMessage = null;
    }
  }

  toggleSignUpEtudiant() {
    this.showSignUpEtudiant = !this.showSignUpEtudiant;
    if (this.showSignUpEtudiant) {
      this.showSignInEtudiant = false;
      this.showSignInProfesseur = false;
      this.showSignUpProfesseur = false;
      this.errorMessage = null;
      this.successMessage = null;
    }
  }

  toggleSignInProfesseur() {
    this.showSignInProfesseur = !this.showSignInProfesseur;
    if (this.showSignInProfesseur) {
      this.showSignInEtudiant = false;
      this.showSignUpEtudiant = false;
      this.showSignUpProfesseur = false;
      this.errorMessage = null;
      this.successMessage = null;
    }
  }

  toggleSignUpProfesseur() {
    this.showSignUpProfesseur = !this.showSignUpProfesseur;
    if (this.showSignUpProfesseur) {
      this.showSignInEtudiant = false;
      this.showSignUpEtudiant = false;
      this.showSignInProfesseur = false;
      this.errorMessage = null;
      this.successMessage = null;
    }
  }

  onSignIn(form: NgForm, role: string) {
    if (form.valid) {
      const request = {
        action: 'signin',
        role: role,
        email: form.value.email,
        password: form.value.password
      };
      this.authService.processAuth(request).subscribe(
        response => {
          const res = JSON.parse(response);
          this.successMessage = res.message;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', res.token);
          const userId = parseInt(res.id, 10); // Assure la conversion en nombre
          this.userService.setUser(userId, role); // Stocke l'ID et le rôle
          
          // Rediriger avec l'ID dans l'URL
          if (role === 'etudiant') {
            this.router.navigate(['/etudiant', userId]);
          } else {
            this.router.navigate(['/professeur', userId]);
          }
        },
        error => {
          this.errorMessage = error.error || 'Erreur de connexion. Vérifiez vos identifiants.';
          this.successMessage = null;
        }
      );
    }
  }

  onSignUp(form: NgForm, role: string) {
    if (form.valid) {
      const request = {
        action: 'signup',
        role: role,
        nom: form.value.nom,
        email: form.value.email,
        password: form.value.password
      };
      this.authService.processAuth(request).subscribe(
        response => {
          this.successMessage = response;
          this.errorMessage = null;
          if (role === 'etudiant') this.showSignUpEtudiant = false;
          else this.showSignUpProfesseur = false;
        },
        error => {
          this.errorMessage = error.error || 'Erreur lors de l\'inscription. Veuillez réessayer.';
          this.successMessage = null;
        }
      );
    }
  }
}