/**
 * @file etudiant-detail.component.ts
 * @description Composant standalone pour afficher le détail d'un etudiant ou alternance.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EtudiantService } from '../../services/etudiant.service';
import { Etudiant } from '../../models/etudiant.model';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

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
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private etudiantService: EtudiantService,
    private alertService: AlertService
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
      this.alertService.confirm('Es-tu sûr de vouloir supprimer cet etudiant ?')
      .then((result) => {
        if (result.isConfirmed && this.etudiantId) {
          this.etudiantService.deleteEtudiant(this.etudiantId).subscribe(() => {
            this.alertService.success('L\'etudiant a été supprimée avec succès.')
            .then(() => {
              this.router.navigate(['/etudiants']);
            });
          });
        }
      });
    } else {
      console.error("Pas d'ID trouvé !");
    }
  }

  modifierMotDePasse() {
    this.router.navigate(['/users/edit/', this.etudiant?.user.id]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}