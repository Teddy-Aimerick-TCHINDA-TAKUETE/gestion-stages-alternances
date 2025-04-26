// 📄 entreprise-form.component.ts
// ----------------------------------------------------------------
// Auteur      : Teddy
// Date        : Avril 2025
// Description : Composant Angular pour ajouter une nouvelle offre de entreprise ou alternance
// ----------------------------------------------------------------

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EntrepriseService } from '../services/entreprise.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entreprise-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../pages/entreprise-form.component.html',
  styleUrls: ['../css/entreprise-form.component.css']
})
export class EntrepriseFormComponent {
  entrepriseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private entrepriseService: EntrepriseService,
    private router: Router
  ) {
    // Initialisation du formulaire avec validations
    this.entrepriseForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      siteWeb: ['', Validators.required],
      secteurActivite: ['', Validators.required],
    });
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.entrepriseForm.valid) {
      this.entrepriseService.createEntreprise(this.entrepriseForm.value).subscribe(() => {
        this.router.navigate(['/entreprises']); // Redirection vers la liste
      });
    }
  }
}