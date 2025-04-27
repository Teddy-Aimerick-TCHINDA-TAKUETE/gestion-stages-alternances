/**
 * @file etudiant-detail.component.ts
 * @description Composant standalone pour afficher le détail d'un etudiant ou alternance.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EtudiantService } from '../../services/etudiant.service';
import { Etudiant } from '../../models/etudiant.model';

@Component({
  selector: 'app-etudiant-detail',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: '../../pages/detail/etudiant-detail.component.html',
  styleUrls: ['../../css/detail/etudiant-detail.component.css']
})
export class EtudiantDetailComponent implements OnInit {

  etudiant: Etudiant | undefined;
  etudiantId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private etudiantService: EtudiantService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.etudiantId = +id;
      this.etudiantService.getEtudiantById(+id).subscribe({
        next: data => {
            this.etudiant = data;
          },
          error: err => {
            console.error('Erreur de récupération du etudiant :', err);
            this.etudiant = undefined;
          }
      });
    }
  }

  modifierEtudiant() {
    if (this.etudiantId) {
      this.router.navigate(['/etudiants/edit', this.etudiantId]);
    }
  }

  supprimerEtudiant() {
    if (this.etudiantId) {
      if (confirm('Es-tu sûr de vouloir supprimer cet etudiant ?')) {
        this.etudiantService.deleteEtudiant(this.etudiantId).subscribe(() => {
          alert('Etudiant supprimé avec succès 🚀');
          this.router.navigate(['/etudiants']);
        });
      }
    }
  }
}