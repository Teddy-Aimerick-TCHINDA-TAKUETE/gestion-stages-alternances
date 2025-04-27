/**
 * @file stage-detail.component.ts
 * @description Composant standalone pour afficher le détail d'un stage ou alternance.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StageService } from '../../services/stage.service';
import { Stage } from '../../models/stage.model';

@Component({
  selector: 'app-stage-detail',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: '../../pages/detail/stage-detail.component.html',
  styleUrls: ['../../css/detail/stage-detail.component.css']
})
export class StageDetailComponent implements OnInit {

  stage: Stage | undefined;
  stageId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stageService: StageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.stageService.getStageById(+id).subscribe({
        next: data => {
            this.stage = data;
          },
          error: err => {
            console.error('Erreur de récupération du stage :', err);
            this.stage = undefined;
          }
      });
    }
  }

  modifierStage() {
    if (this.stageId) {
      this.router.navigate(['/stages/edit', this.stageId]);
    }
  }

  supprimerStage() {
    if (this.stageId) {
      if (confirm('Es-tu sûr de vouloir supprimer ce stage/alternance ?')) {
        this.stageService.deleteStage(this.stageId).subscribe(() => {
          alert('Stage/Alternance supprimé avec succès 🚀');
          this.router.navigate(['/stages']);
        });
      }
    }
  }
}