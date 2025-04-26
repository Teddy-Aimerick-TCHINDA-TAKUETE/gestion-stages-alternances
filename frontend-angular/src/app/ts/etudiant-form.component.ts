// 📄 etudiant-form.component.ts
// ----------------------------------------------------------------
// Auteur      : Teddy
// Date        : Avril 2025
// Description : Composant Angular pour ajouter une nouvelle offre de etudiant ou alternance
// ----------------------------------------------------------------

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EtudiantService } from '../services/etudiant.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-etudiant-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../pages/etudiant-form.component.html',
  styleUrls: ['../css/etudiant-form.component.css']
})
export class EtudiantFormComponent {
  etudiantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private etudiantService: EtudiantService,
    private router: Router
  ) {
    // Initialisation du formulaire avec validations
    this.etudiantForm = this.fb.group({
      niveauEtude: ['', Validators.required],
      specialite: ['', Validators.required],
      telephone: ['', Validators.required],
      cv: ['', Validators.required],
    });
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.etudiantForm.valid) {
      this.etudiantService.createEtudiant(this.etudiantForm.value).subscribe(() => {
        this.router.navigate(['/etudiants']); // Redirection vers la liste
      });
    }
  }
}