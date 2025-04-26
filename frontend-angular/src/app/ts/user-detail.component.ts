/**
 * @file user-detail.component.ts
 * @description Composant standalone pour afficher le détail d'un user ou alternance.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: '../pages/user-detail.component.html',
  styleUrls: ['../css/user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(+id).subscribe({
        next: data => {
            this.user = data;
          },
          error: err => {
            console.error('Erreur de récupération du user :', err);
            this.user = undefined;
          }
      });
    }
  }
}