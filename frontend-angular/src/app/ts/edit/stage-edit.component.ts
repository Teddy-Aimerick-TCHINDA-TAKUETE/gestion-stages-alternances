import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StageService } from '../../services/stage.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Stage } from '../../models/stage.model';

@Component({
  selector: 'app-stage-edit',
  standalone: true,
  templateUrl: '../../pages/edit/stage-edit.component.html',
  styleUrls: ['../../css/edit/stage-edit.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class StageEditComponent implements OnInit {
  stageForm: FormGroup;
  stageId: number | undefined;
  entreprises: any[] = []; // 📄 pour charger la liste des entreprises existantes
  typeStageOptions = ['STAGE', 'ALTERNANCE']; // 📄 choix du type
  message: string = ''; // ➔ Ajout d'un champ pour afficher les messages
  messageType: 'success' | 'error' | '' = ''; // ➔ Pour changer la couleur du message

  constructor(
    private fb: FormBuilder,
    private stageService: StageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.stageForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      lieu: ['', Validators.required],
      duree: ['', Validators.required],
      entrepriseId: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.stageId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.stageId) {
      this.stageService.getStageById(this.stageId).subscribe((stage) => {
        this.stageForm.patchValue({
        titre: stage?.titre,
        description: stage?.description,
        lieu: stage?.lieu,
        duree: stage?.duree,
        entrepriseId: stage?.entreprise.id,
        type: stage?.type,
        });
      });
    }
  }

  onSubmit() {
    if (this.stageForm.valid && this.stageId) {
      const updateStage = {
        id: this.stageId,
        titre: this.stageForm.value.titre,
        description: this.stageForm.value.description,
        lieu: this.stageForm.value.lieu,
        duree: this.stageForm.value.duree,
        entreprise: { id: this.stageForm.value.entrepriseId },
        type: this.stageForm.value.type,
      }
      this.stageService.updateStage(this.stageId, updateStage).subscribe({
        next: () => {
          this.messageType = 'success';
          this.message = '✅ Stage/Alternance modifié(e) avec succès !';
          // Rediriger après quelques secondes
          setTimeout(() => {
            this.router.navigate(['/stages', this.stageId]);
          }, 2000);
        },
        error: (err) => {
          console.error('Erreur lors de la modification du stage/alternance', err);
          this.messageType = 'error';
          this.message = '❌ Erreur lors de la modification du stage/alternance.';
        }
      });
    }
  }

  annuler() {
    this.router.navigate(['/stages', this.stageId]);
  }
}