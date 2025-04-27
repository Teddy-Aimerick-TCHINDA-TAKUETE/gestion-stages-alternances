/**
 * Fichier : etudiant-list.component.ts
 * Rôle : Composant Angular standalone affichant la liste des etudiants et alternances,
 *        avec filtrage par type et appel API.
 * Auteur : Teddy
 * Date : 24/04/2025
 */

import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../../models/etudiant.model';
import { EtudiantService } from '../../services/etudiant.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-etudiant-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: '../../pages/list/etudiant-list.component.html',
  styleUrls: ['../../css/list/etudiant-list.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ]
})
export class EtudiantListComponent {
  
  etudiants: Etudiant[] = [];

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit(): void {
    this.etudiantService.getAllEtudiants().subscribe({
      next: (data) => (this.etudiants = data),
      error: (err) => console.error('Erreur API :', err)
    });
  }

  voirDetail(etudiant: any) {
    console.log('Etudiant sélectionné :', etudiant);
    alert(`Etudiant : ${etudiant.titre}\nLieu : ${etudiant.lieu}\nType : ${etudiant.type}`);
  }
}
