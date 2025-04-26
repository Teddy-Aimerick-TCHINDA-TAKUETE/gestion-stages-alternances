/**
 * Fichier : user-list.component.ts
 * Rôle : Composant Angular standalone affichant la liste des users et alternances,
 *        avec filtrage par type et appel API.
 * Auteur : Teddy
 * Date : 24/04/2025
 */

import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FiltreRolePipe } from '../pipes/filtre-role.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltreRolePipe, RouterLink],
  templateUrl: '../pages/user-list.component.html',
  styleUrls: ['../css/user-list.component.css']
})
export class UserListComponent {
  
  users: User[] = [];
  typeFiltre: string = 'Tous';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Erreur API :', err)
    });
  }

  voirDetail(user: any) {
    console.log('User sélectionné :', user);
    alert(`User : ${user.titre}\nLieu : ${user.lieu}\nType : ${user.type}`);
  }
}
