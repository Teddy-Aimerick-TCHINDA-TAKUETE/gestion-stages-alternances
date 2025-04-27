/**
 * @file candidature-detail.component.ts
 * @description Composant standalone pour afficher le détail d'un candidature ou alternance.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CandidatureService } from '../../services/candidature.service';
import { Candidature } from '../../models/candidature.model';

@Component({
  selector: 'app-candidature-detail',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: '../../pages/detail/candidature-detail.component.html',
  styleUrls: ['../../css/detail/candidature-detail.component.css']
})
export class CandidatureDetailComponent implements OnInit {

  candidature: Candidature | undefined;
  candidatureId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidatureService: CandidatureService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.candidatureService.getCandidatureById(+id).subscribe({
        next: data => {
            if (data)
              data.dateCandidature = new Date(data.dateCandidature).toISOString();
            this.candidature = data;
          },
          error: err => {
            console.error('Erreur de récupération du candidature :', err);
            this.candidature = undefined;
          }
      });
    }
  }

  modifierCandidature() {
    if (this.candidatureId) {
      this.router.navigate(['/candidatures/edit', this.candidatureId]);
    }
  }

  supprimerCandidature() {
    if (this.candidatureId) {
      if (confirm('Es-tu sûr de vouloir supprimer cet candidature ?')) {
        this.candidatureService.deleteCandidature(this.candidatureId).subscribe(() => {
          alert('Candidature supprimé avec succès 🚀');
          this.router.navigate(['/candidatures']);
        });
      }
    }
  }
}