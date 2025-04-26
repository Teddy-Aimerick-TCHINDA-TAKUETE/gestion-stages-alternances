/**
 * @file etudiant-detail.component.ts
 * @description Composant standalone pour afficher le détail d'un etudiant ou alternance.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EtudiantService } from '../services/etudiant.service';
import { Etudiant } from '../models/etudiant.model';

@Component({
  selector: 'app-etudiant-detail',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: '../pages/etudiant-detail.component.html',
  styleUrls: ['../css/etudiant-detail.component.css']
})
export class EtudiantDetailComponent implements OnInit {

  etudiant: Etudiant | undefined;

  constructor(
    private route: ActivatedRoute,
    private etudiantService: EtudiantService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
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
}