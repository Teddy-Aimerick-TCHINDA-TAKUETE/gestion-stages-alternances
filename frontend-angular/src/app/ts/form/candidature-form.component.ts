// 📄 candidature-form.component.ts
// ----------------------------------------------------------------
// Auteur      : Teddy
// Date        : Avril 2025
// Description : Composant Angular pour ajouter une nouvelle offre de candidature ou alternance
// ----------------------------------------------------------------

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CandidatureService } from '../../services/candidature.service';
import { StageService } from '../../services/stage.service';
import { Stage } from '../../models/stage.model';
import { EtudiantService } from '../../services/etudiant.service';
import { Etudiant } from '../../models/etudiant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-candidature-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../../pages/form/candidature-form.component.html',
  styleUrls: ['../../css/form/candidature-form.component.css']
})
export class CandidatureFormComponent implements OnInit {
  candidatureForm: FormGroup;
  stageId: number | undefined;
  stages: Stage[] = [];
  etudiants: Etudiant[] = [];
  message: string = ''; // ➔ Ajout d'un champ pour afficher les messages
  messageType: 'success' | 'error' | '' = ''; // ➔ Pour changer la couleur du message

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private candidatureService: CandidatureService,
    private stageService: StageService,
    private etudiantService: EtudiantService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    // Initialisation du formulaire avec validations
    this.candidatureForm = this.fb.group({
      etudiantId: ['', Validators.required],
      stageId: ['', Validators.required],
      dateDisponibilite: [''],
      message: ['']
    });
  }

  ngOnInit() {
    this.stageId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.stageId) {
      this.stageService.getStageById(this.stageId).subscribe((stage) => {
        this.candidatureForm.patchValue({
        stageId: stage?.id,
        });
      });
    }

    if(this.authService.getCurrentProfilId() && this.authService.isEtudiant()){
      this.candidatureForm.patchValue({
      etudiantId: this.authService.getCurrentProfilId(),
      });
    }

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
        dateDisponibilite: this.candidatureForm.value.dateDisponibilite,
        message: this.candidatureForm.value.message
        // ⚡ dateCandidature et statut EN_ATTENTE sont ajoutés automatiquement par le backend
      };

      this.candidatureService.createCandidature(candidaturePayload).subscribe({
        next: () => {
          this.messageType = 'success';
          this.message = '✅ Candidature envoyée avec succès !';
          this.alertService.success(this.message)
          .then(() => {
            // Rediriger après quelques secondes
            //setTimeout(() => {
              this.router.navigate(['/candidatures']);
            //}, 2000);
          });
        },
        error: (err) => {
          console.error('Erreur lors de la création de la candidature', err);
          this.messageType = 'error';
          this.message = '❌ Erreur lors de la création de la candidature.';
          this.alertService.error(this.message);
        }
      });
    } else {
      this.messageType = 'error';
      this.message = '⚠️ Merci de compléter le formulaire correctement.';
      this.alertService.error(this.message);
    }
  }
}