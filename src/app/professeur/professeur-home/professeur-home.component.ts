import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { ProfService } from '../../shared/services/prof-service.service';

@Component({
  selector: 'app-professeur-home',
  standalone: false,
  templateUrl: './professeur-home.component.html',
  styleUrls: ['./professeur-home.component.css']
})
export class ProfesseurHomeComponent implements OnInit {
  userId: number | null = null;

  constructor(
    private profService: ProfService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    console.log('ID du professeur:', this.userId); // Pour débogage
  }

  logout(): void {
    this.profService.logoutProfesseur().subscribe({
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