/**
 * Fichier : admin-list.component.ts
 * Rôle : Composant Angular standalone affichant la liste des admins et alternances,
 *        avec filtrage par type et appel API.
 * Auteur : Teddy
 * Date : 24/04/2025
 */

import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin.model';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: '../pages/admin-list.component.html',
  styleUrls: ['../css/admin-list.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ]
})
export class AdminListComponent {
  
  admins: Admin[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllAdmins().subscribe({
      next: (data) => (this.admins = data),
      error: (err) => console.error('Erreur API :', err)
    });
  }

  voirDetail(admin: any) {
    console.log('Admin sélectionné :', admin);
    alert(`Admin : ${admin.titre}\nLieu : ${admin.lieu}\nType : ${admin.type}`);
  }
}
