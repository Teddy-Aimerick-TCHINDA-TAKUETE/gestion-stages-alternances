/**
 * Fichier : stage-list.component.ts
 * Rôle : Composant Angular standalone affichant la liste des stages et alternances,
 *        avec filtrage par type et appel API.
 * Auteur : Teddy
 * Date : 24/04/2025
 */

import { Component, OnInit } from '@angular/core';
import { Stage } from '../models/stage.model';
import { StageService } from '../services/stage.service';
import { CommonModule } from '@angular/common';
import { FiltreTypePipe } from '../pipes/filtre-type.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-stage-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltreTypePipe, RouterLink],
  templateUrl: '../pages/stage-list.component.html',
  styleUrls: ['../css/stage-list.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ]
})
export class StageListComponent {
  
  stages: Stage[] = [];
  typeFiltre: string = 'Tous';

  constructor(private stageService: StageService) {}

  ngOnInit(): void {
    this.stageService.getAllStages().subscribe({
      next: (data) => (this.stages = data),
      error: (err) => console.error('Erreur API :', err)
    });
  }

  voirDetail(stage: any) {
    console.log('Stage sélectionné :', stage);
    alert(`Stage : ${stage.titre}\nLieu : ${stage.lieu}\nType : ${stage.type}`);
  }
}
