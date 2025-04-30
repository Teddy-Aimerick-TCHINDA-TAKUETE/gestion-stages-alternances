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
import { AuthService } from '../../services/auth.service';

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

  constructor(public authService: AuthService, private candidatureService: CandidatureService) {}

  isLoaded = false;

  ngOnInit(): void {
    const userId = this.authService.getCurrentProfilId();

    if (this.authService.isEtudiant() && userId) {
      this.candidatureService.getCandidaturesByEtudiantId(userId).subscribe({
        next: (data) => this.candidatures = this.transformDates(data),
        error: (err) => console.error('Erreur API Étudiant :', err)
      });
    } else if (this.authService.isEntreprise() && userId) {
      this.candidatureService.getCandidaturesByEntrepriseId(userId).subscribe({
        next: (data) => this.candidatures = this.transformDates(data),
        error: (err) => console.error('Erreur API Entreprise :', err)
      });
    } else {
      // Admin
      this.candidatureService.getAllCandidatures().subscribe({
        next: (data) => {this.candidatures = this.transformDates(data); this.isLoaded = true;},
        error: (err) => {console.error('Erreur API :', err); this.isLoaded = true;}
      });
    }

    /*this.candidatures.forEach( data => {
      if (data){
        data.dateCandidature = new Date(data.dateCandidature).toISOString();
        data.dateDisponibilite = new Date(data.dateDisponibilite).toISOString();
      }
    })*/
  }

  transformDates(data: Candidature[]): Candidature[] {
    return data.map(c => ({
      ...c,
      dateCandidature: new Date(c.dateCandidature).toISOString(),
      dateDisponibilite: new Date(c.dateDisponibilite).toISOString()
    }));
  }

  voirDetail(candidature: any) {
    console.log('Candidature sélectionné :', candidature);
    alert(`Candidature : ${candidature.titre}\nLieu : ${candidature.lieu}\nType : ${candidature.type}`);
  }
}
