// 📄 candidature-form.component.ts
// ----------------------------------------------------------------
// Auteur      : Teddy
// Date        : Avril 2025
// Description : Composant Angular pour ajouter une nouvelle offre de candidature ou alternance
// ----------------------------------------------------------------

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CandidatureService } from '../services/candidature.service';
import { StageService } from '../services/stage.service';
import { Stage } from '../models/stage.model';
import { EtudiantService } from '../services/etudiant.service';
import { Etudiant } from '../models/etudiant.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidature-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../pages/candidature-form.component.html',
  styleUrls: ['../css/candidature-form.component.css']
})
export class CandidatureFormComponent implements OnInit {
  candidatureForm: FormGroup;
  stages: Stage[] = [];
  etudiants: Etudiant[] = [];
  message: string = ''; // ➔ Ajout d'un champ pour afficher les messages
  messageType: 'success' | 'error' | '' = ''; // ➔ Pour changer la couleur du message

  constructor(
    private fb: FormBuilder,
    private candidatureService: CandidatureService,
    private stageService: StageService,
    private etudiantService: EtudiantService,
    private router: Router
  ) {
    // Initialisation du formulaire avec validations
    this.candidatureForm = this.fb.group({
      etudiantId: ['', Validators.required],
      stageId: ['', Validators.required],
      message: ['']
    });
  }

  ngOnInit() {
    this.stageService.getAllStages().subscribe({
      next: (stages) => this.stages = stages,
      error: (err) => console.error('Erreur lors du chargement des stages', err)
    });

    this.etudiantService.getAllEtudiants().subscribe({
      next: (etudiants) => this.etudiants = etudiants,
      error: (err) => console.error('Erreur lors du chargement des étudiants', err)
    });
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.candidatureForm.valid) {
      const candidaturePayload = {
        etudiant: { id: this.candidatureForm.value.etudiantId },
        stage: { id: this.candidatureForm.value.stageId },
        message: this.candidatureForm.value.message
        // ⚡ dateCandidature et statut EN_ATTENTE sont ajoutés automatiquement par le backend
      };

      this.candidatureService.createCandidature(candidaturePayload).subscribe({
        next: () => {
          this.messageType = 'success';
              this.message = '✅ Candidature envoyée avec succès !';
              // Rediriger après quelques secondes
              setTimeout(() => {
                this.router.navigate(['/candidatures']);
              }, 2000);
        },
        error: (err) => {
          console.error('Erreur lors de la création de la candidature', err);
              this.messageType = 'error';
              this.message = '❌ Erreur lors de la création de la candidature.';
        }
      });
    } else {
      this.messageType = 'error';
      this.message = '⚠️ Merci de compléter le formulaire correctement.';
    }
  }
}