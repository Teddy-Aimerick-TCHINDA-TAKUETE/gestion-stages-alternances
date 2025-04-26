/**
 * @file admin-detail.component.ts
 * @description Composant standalone pour afficher le détail d'un admin ou alternance.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';
import { Admin } from '../models/admin.model';

@Component({
  selector: 'app-admin-detail',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: '../pages/admin-detail.component.html',
  styleUrls: ['../css/admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {

  admin: Admin | undefined;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.adminService.getAdminById(+id).subscribe({
        next: data => {
            this.admin = data;
          },
          error: err => {
            console.error('Erreur de récupération du admin :', err);
            this.admin = undefined;
          }
      });
    }
  }
}