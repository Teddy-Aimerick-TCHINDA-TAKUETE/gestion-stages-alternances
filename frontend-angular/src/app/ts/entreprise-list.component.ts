/**
 * Fichier : entreprise-list.component.ts
 * Rôle : Composant Angular standalone affichant la liste des entreprises et alternances,
 *        avec filtrage par type et appel API.
 * Auteur : Teddy
 * Date : 24/04/2025
 */

import { Component, OnInit } from '@angular/core';
import { Entreprise } from '../models/entreprise.model';
import { EntrepriseService } from '../services/entreprise.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-entreprise-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: '../pages/entreprise-list.component.html',
  styleUrls: ['../css/entreprise-list.component.css']
})
export class EntrepriseListComponent {
  
  entreprises: Entreprise[] = [];

  constructor(private entrepriseService: EntrepriseService) {}

  ngOnInit(): void {
    this.entrepriseService.getAllEntreprises().subscribe({
      next: (data) => (this.entreprises = data),
      error: (err) => console.error('Erreur API :', err)
    });
  }

  voirDetail(entreprise: any) {
    console.log('Entreprise sélectionné :', entreprise);
    alert(`Entreprise : ${entreprise.titre}\nLieu : ${entreprise.lieu}\nType : ${entreprise.type}`);
  }
}
