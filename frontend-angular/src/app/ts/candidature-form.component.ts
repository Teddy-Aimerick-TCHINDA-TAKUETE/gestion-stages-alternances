// 📄 candidature-form.component.ts
// ----------------------------------------------------------------
// Auteur      : Teddy
// Date        : Avril 2025
// Description : Composant Angular pour ajouter une nouvelle offre de candidature ou alternance
// ----------------------------------------------------------------

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CandidatureService } from '../services/candidature.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidature-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../pages/candidature-form.component.html',
  styleUrls: ['../css/candidature-form.component.css']
})
export class CandidatureFormComponent {
  candidatureForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private candidatureService: CandidatureService,
    private router: Router
  ) {
    // Initialisation du formulaire avec validations
    this.candidatureForm = this.fb.group({
      dateCandidature: ['', Validators.required],
      message: ['', Validators.required],
      statut: ['', Validators.required],
      etudiantId: ['', Validators.required],
      stageId: ['', Validators.required]
    });
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.candidatureForm.valid) {
      this.candidatureService.createCandidature(this.candidatureForm.value).subscribe(() => {
        this.router.navigate(['/candidatures']); // Redirection vers la liste
      });
    }
  }
}