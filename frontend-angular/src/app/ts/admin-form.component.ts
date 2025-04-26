// 📄 admin-form.component.ts
// ----------------------------------------------------------------
// Auteur      : Teddy
// Date        : Avril 2025
// Description : Composant Angular pour ajouter une nouvelle offre de admin ou alternance
// ----------------------------------------------------------------

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../pages/admin-form.component.html',
  styleUrls: ['../css/admin-form.component.css']
})
export class AdminFormComponent {
  adminForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {
    // Initialisation du formulaire avec validations
    this.adminForm = this.fb.group({
      niveauEtude: ['', Validators.required],
      specialite: ['', Validators.required],
      telephone: ['', Validators.required],
      cv: ['', Validators.required],
    });
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.adminForm.valid) {
      this.adminService.createAdmin(this.adminForm.value).subscribe(() => {
        this.router.navigate(['/admins']); // Redirection vers la liste
      });
    }
  }
}