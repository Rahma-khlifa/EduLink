import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { EtudiantService } from '../../shared/services/etudiant-service.service';

@Component({
  selector: 'app-etudiant-home',
  standalone: false,
  templateUrl: './etudiant-home.component.html',
  styleUrls: ['./etudiant-home.component.css']
})
export class EtudiantHomeComponent implements OnInit {
  userId: number | null = null;

  constructor(
    private etudiantService: EtudiantService,
    private userService: UserService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    console.log('ID de l\'étudiant:', this.userId); // Pour débogage
  }

  logout(): void {
    this.etudiantService.logoutEtudiant().subscribe({
      next: () => {
        this.userService.clearUser();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erreur lors de la déconnexion', err);
      }
    });
  }
}