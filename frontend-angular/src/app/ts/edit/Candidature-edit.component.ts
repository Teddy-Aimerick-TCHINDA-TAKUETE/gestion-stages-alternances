import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StageService } from '../../services/stage.service';
import { Stage } from '../../models/stage.model';
import { EtudiantService } from '../../services/etudiant.service';
import { Etudiant } from '../../models/etudiant.model';
import { CandidatureService } from '../../services/candidature.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-candidature-edit',
  standalone: true,
  templateUrl: '../../pages/edit/candidature-edit.component.html',
  styleUrls: ['../../css/edit/candidature-edit.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CandidatureEditComponent implements OnInit {
  candidatureForm: FormGroup;
  candidatureId: number | undefined;
  stages: Stage[] = [];
  etudiants: Etudiant[] = [];
  message: string = ''; // ➔ Ajout d'un champ pour afficher les messages
  messageType: 'success' | 'error' | '' = ''; // ➔ Pour changer la couleur du message

  constructor(
    private fb: FormBuilder,
    private candidatureService: CandidatureService,
    private stageService: StageService,
    private etudiantService: EtudiantService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    this.candidatureForm = this.fb.group({
      etudiantId: ['', Validators.required],
      stageId: ['', Validators.required],
      dateDisponibilite: [''],
      message: [''],
    });
  }

  ngOnInit(): void {
    this.candidatureId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.candidatureId) {
      this.candidatureService.getCandidatureById(this.candidatureId).subscribe((candidature) => {
        this.candidatureForm.patchValue({
        etudiantId: candidature?.etudiant.id,
        stageId: candidature?.stage.id,
        dateDisponibilite: candidature?.dateDisponibilite,
        message: candidature?.message,
        });
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

  onSubmit() {
    if (this.candidatureForm.valid && this.candidatureId) {
      const candidaturePayload = {
        etudiant: { id: this.candidatureForm.value.etudiantId },
        stage: { id: this.candidatureForm.value.stageId },
        dateDisponibilite: this.candidatureForm.value.dateDisponibilite,
        message: this.candidatureForm.value.message
        // ⚡ dateCandidature et statut EN_ATTENTE sont ajoutés automatiquement par le backend
      };
      this.candidatureService.updateCandidature(this.candidatureId, candidaturePayload).subscribe({
        next: () => {
          this.messageType = 'success';
          this.message = '✅ Candidature modifiée avec succès !';
          this.alertService.success(this.message)
          .then(() => {
            // Rediriger après quelques secondes
            //setTimeout(() => {
              this.router.navigate(['/candidatures', this.candidatureId]);
            //}, 2000);
          });
        },
        error: (err) => {
          console.error('Erreur lors de la modification de la candidature', err);
          this.messageType = 'error';
          this.message = '❌ Erreur lors de la modiafication de la candidature.';
          this.alertService.error(this.message);
        }
      });
    } else {
      this.messageType = 'error';
      this.message = '⚠️ Merci de compléter le formulaire correctement.';
      this.alertService.error(this.message);
    }
  }

  annuler() {
    this.messageType = 'error';
    this.message = '❌ Ete vous sur de vouloir annuler les modifications ?';
    this.alertService.confirm(this.message)
    .then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/candidatures', this.candidatureId]);
      }
    });
  }
}