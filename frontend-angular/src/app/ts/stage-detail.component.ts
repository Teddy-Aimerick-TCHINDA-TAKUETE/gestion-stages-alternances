/**
 * @file stage-detail.component.ts
 * @description Composant standalone pour afficher le détail d'un stage ou alternance.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StageService } from '../services/stage.service';
import { Stage } from '../models/stage.model';

@Component({
  selector: 'app-stage-detail',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: '../pages/stage-detail.component.html',
  styleUrls: ['../css/stage-detail.component.css']
})
export class StageDetailComponent implements OnInit {

  stage: Stage | undefined;

  constructor(
    private route: ActivatedRoute,
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
}