/**
 * Fichier : candidature-list.component.ts
 * Rôle : Composant Angular standalone affichant la liste des candidatures et alternances,
 *        avec filtrage par type et appel API.
 * Auteur : Teddy
 * Date : 24/04/2025
 */

import { Component, OnInit } from '@angular/core';
import { Candidature } from '../../models/candidature.model';
import { CandidatureService } from '../../services/candidature.service';
import { CommonModule } from '@angular/common';
import { FiltreStatutCandidaturePipe } from '../../pipes/filtre-statut-candidature.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-candidature-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltreStatutCandidaturePipe, RouterLink],
  templateUrl: '../../pages/list/candidature-list.component.html',
  styleUrls: ['../../css/list/candidature-list.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ]
})
export class CandidatureListComponent {
  
  candidatures: Candidature[] = [];
  typeFiltre: string = 'Tous';

  constructor(private candidatureService: CandidatureService) {}

  ngOnInit(): void {
    this.candidatureService.getAllCandidatures().subscribe({
      next: (data) => {
        this.candidatures = data},
      error: (err) => console.error('Erreur API :', err)
    });

    this.candidatures.forEach( data => {
      if (data){
        data.dateCandidature = new Date(data.dateCandidature).toISOString();
        data.dateDisponibilite = new Date(data.dateDisponibilite).toISOString();
      }
    })
  }

  voirDetail(candidature: any) {
    console.log('Candidature sélectionné :', candidature);
    alert(`Candidature : ${candidature.titre}\nLieu : ${candidature.lieu}\nType : ${candidature.type}`);
  }
}
