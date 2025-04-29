import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choix-inscription',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../../pages/autre/choix-inscription.component.html',
  styleUrls: ['../../css/autre/choix-inscription.component.css']
})
export class ChoixInscriptionComponent {
  constructor(private router: Router) {}

  choisirEtudiant() {
    this.router.navigate(['/etudiants/create']);
  }

  choisirEntreprise() {
    this.router.navigate(['/entreprises/create']);
  }
}