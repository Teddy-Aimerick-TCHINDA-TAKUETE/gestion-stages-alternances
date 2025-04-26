// 📄 stage-form.component.ts
// ----------------------------------------------------------------
// Auteur      : Teddy
// Date        : Avril 2025
// Description : Composant Angular pour ajouter une nouvelle offre de stage ou alternance
// ----------------------------------------------------------------

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StageService } from '../services/stage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stage-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../pages/stage-form.component.html',
  styleUrls: ['../css/stage-form.component.css']
})
export class StageFormComponent {
  stageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stageService: StageService,
    private router: Router
  ) {
    // Initialisation du formulaire avec validations
    this.stageForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      lieu: ['', Validators.required],
      duree: ['', Validators.required],
      type: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      entrepriseId: ['', Validators.required]  // Id de l'entreprise liée
    });
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.stageForm.valid) {
      this.stageService.createStage(this.stageForm.value).subscribe(() => {
        this.router.navigate(['/stages']); // Redirection vers la liste
      });
    }
  }
}