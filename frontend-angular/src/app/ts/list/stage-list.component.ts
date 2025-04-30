/**
 * Fichier : stage-list.component.ts
 * Rôle : Composant Angular standalone affichant la liste des stages et alternances,
 *        avec filtrage par type et appel API.
 * Auteur : Teddy
 * Date : 24/04/2025
 */

import { Component, OnInit } from '@angular/core';
import { Stage } from '../../models/stage.model';
import { StageService } from '../../services/stage.service';
import { CommonModule } from '@angular/common';
import { FiltreTypePipe } from '../../pipes/filtre-type.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-stage-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltreTypePipe, RouterLink],
  templateUrl: '../../pages/list/stage-list.component.html',
  styleUrls: ['../../css/list/stage-list.component.css'],
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

  constructor(public authService: AuthService, private stageService: StageService) {}

  isLoaded = false;

  ngOnInit(): void {
    const userId = this.authService.getCurrentProfilId();

    if (this.authService.isEntreprise() && userId) {
      this.stageService.getStagesByEntrepriseId(userId).subscribe({
        next: (data) => this.stages = data,
        error: (err) => console.error('Erreur API Entreprise :', err)
      });
    } else {
      this.stageService.getAllStages().subscribe({
        next: (data) => {this.stages = data; this.isLoaded = true;},
        error: (err) => {console.error('Erreur API :', err); this.isLoaded = true;}
      });
    }
  }

  voirDetail(stage: any) {
    console.log('Stage sélectionné :', stage);
    alert(`Stage : ${stage.titre}\nLieu : ${stage.lieu}\nType : ${stage.type}`);
  }
}
