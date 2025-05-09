/**
 * @file entreprise-detail.component.ts
 * @description Composant standalone pour afficher le détail d'un entreprise ou alternance.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EntrepriseService } from '../../services/entreprise.service';
import { Entreprise } from '../../models/entreprise.model';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

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
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private entrepriseService: EntrepriseService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.entrepriseId = +id;
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
      this.alertService.confirm('Es-tu sûr de vouloir supprimer cet entreprise ?')
      .then((result) => {
        if (result.isConfirmed && this.entrepriseId) {
          this.entrepriseService.deleteEntreprise(this.entrepriseId).subscribe(() => {
            this.alertService.success('L\'entreprise a été supprimée avec succès.')
            .then(() => {
              this.router.navigate(['/entreprises']);
            });
          });
        }
      });
    } else {
      console.error("Pas d'ID trouvé !");
    }
  }

  modifierMotDePasse() {
    this.router.navigate(['/users/edit/', this.entreprise?.user.id]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}