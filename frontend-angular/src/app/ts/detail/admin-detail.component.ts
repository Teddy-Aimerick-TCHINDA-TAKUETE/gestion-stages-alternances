/**
 * @file admin-detail.component.ts
 * @description Composant standalone pour afficher le détail d'un admin ou alternance.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../models/admin.model';

@Component({
  selector: 'app-admin-detail',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: '../../pages/detail/admin-detail.component.html',
  styleUrls: ['../../css/detail/admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {

  admin: Admin | undefined;
  adminId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  modifierAdmin() {
    if (this.adminId) {
      this.router.navigate(['/admins/edit', this.adminId]);
    }
  }

  supprimerAdmin() {
    if (this.adminId) {
      if (confirm('Es-tu sûr de vouloir supprimer cet administrateur ?')) {
        this.adminService.deleteAdmin(this.adminId).subscribe(() => {
          alert('Administrateur supprimé avec succès 🚀');
          this.router.navigate(['/admins']);
        });
      }
    }
  }
}