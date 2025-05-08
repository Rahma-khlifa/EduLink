//methode pour consulter les cours 
import { Component, OnInit } from '@angular/core';
import { Cours } from '../../shared/models/cours.model';
import { UserService } from '../../shared/services/user.service';
import { ProfService } from '../../shared/services/prof-service.service';

@Component({
  selector: 'app-consulter-cours',
  standalone: false,
  templateUrl: './consulter-cours.component.html',
  styleUrls: ['./consulter-cours.component.css']
})
export class ConsulterCoursComponent implements OnInit {
  cours: Cours[] = [];

  constructor(private profService: ProfService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserId().subscribe(userId => {
      if (userId) {
        this.profService.getCoursByProfesseur().subscribe({
          next: (cours) => {
            this.cours = cours.map(item => new Cours(item));
          },
          error: (error) => {
            console.error('Erreur lors du chargement des cours', error);
          }
        });
      }
    });
  }
}