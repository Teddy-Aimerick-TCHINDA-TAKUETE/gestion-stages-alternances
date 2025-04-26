/**
 * @file entreprise-detail.component.ts
 * @description Composant standalone pour afficher le détail d'un entreprise ou alternance.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EntrepriseService } from '../services/entreprise.service';
import { Entreprise } from '../models/entreprise.model';

@Component({
  selector: 'app-entreprise-detail',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: '../pages/entreprise-detail.component.html',
  styleUrls: ['../css/entreprise-detail.component.css']
})
export class EntrepriseDetailComponent implements OnInit {

  entreprise: Entreprise | undefined;

  constructor(
    private route: ActivatedRoute,
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
}