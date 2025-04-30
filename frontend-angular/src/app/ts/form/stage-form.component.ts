// 📄 stage-form.component.ts
// ----------------------------------------------------------------
// Auteur      : Teddy
// Date        : Avril 2025
// Description : Composant Angular pour ajouter une nouvelle offre de stage ou alternance
// ----------------------------------------------------------------

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StageService } from '../../services/stage.service';
import { EntrepriseService } from '../../services/entreprise.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-stage-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../../pages/form/stage-form.component.html',
  styleUrls: ['../../css/form/stage-form.component.css']
})
export class StageFormComponent {
  stageForm: FormGroup;
  entreprises: any[] = []; // 📄 pour charger la liste des entreprises existantes
  typeStageOptions = ['STAGE', 'ALTERNANCE']; // 📄 choix du type
  message: string = ''; // ➔ Ajout d'un champ pour afficher les messages
  messageType: 'success' | 'error' | '' = ''; // ➔ Pour changer la couleur du message

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private stageService: StageService,
    private entrepriseService: EntrepriseService,
    private router: Router,
    private alertService: AlertService
  ) {
    // Initialisation du formulaire avec validations
    this.stageForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      lieu: ['', Validators.required],
      duree: ['', Validators.required],
      entrepriseId: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit() {
    if(this.authService.getCurrentProfilId() && this.authService.isEntreprise()){
      this.stageForm.patchValue({
        entrepriseId: this.authService.getCurrentProfilId(),
      });
    }

    // Charger toutes les entreprises existantes pour le select
    this.entrepriseService.getAllEntreprises().subscribe({
      next: (data) => this.entreprises = data,
      error: (err) => console.error('Erreur lors du chargement des entreprises', err)
    });
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.stageForm.valid) {
      const stagePayload = {
        titre: this.stageForm.value.titre,
        description: this.stageForm.value.description,
        lieu: this.stageForm.value.lieu,
        duree: this.stageForm.value.duree,
        type: this.stageForm.value.type,
        entreprise: { id: this.stageForm.value.entrepriseId } // ⚡ On passe juste l'ID de l'entreprise
      };

      this.stageService.createStage(stagePayload).subscribe({
        next: () => {
          this.messageType = 'success';
          this.message = '✅ Stage/Alternace créé avec succès !';
          this.alertService.success(this.message)
          .then(() => {
            // Rediriger après quelques secondes
            //setTimeout(() => {
              this.router.navigate(['/stages']);
            //}, 2000);
          });
        },
        error: (err) => {
          console.error('Erreur lors de la création du stage/alternance', err);
          this.messageType = 'error';
          this.message = '❌ Erreur lors de la création du stage/alternance.';
          this.alertService.error(this.message);
        }
      });
    } else {
      this.messageType = 'error';
      this.message = '⚠️ Merci de remplir tous les champs requis.';
      this.alertService.error(this.message);
    }
  }
}