/**
 * @file entreprise-detail.component.ts
 * @description Composant standalone pour afficher le détail d'un entreprise ou alternance.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EntrepriseService } from '../../services/entreprise.service';
import { Entreprise } from '../../models/entreprise.model';

@Component({
  selector: 'app-entreprise-detail',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: '../../pages/detail/entreprise-detail.component.html',
  styleUrls: ['../../css/detail/entreprise-detail.component.css']
})
export class EntrepriseDetailComponent implements OnInit {

  entreprise: Entreprise | undefined;
  entrepriseId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private entrepriseService: EntrepriseService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.entrepriseService.getEntrepriseById(+id).subscribe({
        next: data => {
            this.entreprise = data;
          },
          error: err => {
            console.error('Erreur de récupération du entreprise :', err);
            this.entreprise = undefined;
          }
      });
    }
  }

  modifierEntreprise() {
    if (this.entrepriseId) {
      this.router.navigate(['/entreprises/edit', this.entrepriseId]);
    }
  }

  supprimerEntreprise() {
    if (this.entrepriseId) {
      if (confirm('Es-tu sûr de vouloir supprimer cet entreprise ?')) {
        this.entrepriseService.deleteEntreprise(this.entrepriseId).subscribe(() => {
          alert('Entreprise supprimé avec succès 🚀');
          this.router.navigate(['/entreprises']);
        });
      }
    }
  }
}