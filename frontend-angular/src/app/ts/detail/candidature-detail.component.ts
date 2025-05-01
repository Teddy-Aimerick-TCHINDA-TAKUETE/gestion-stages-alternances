/**
 * @file candidature-detail.component.ts
 * @description Composant standalone pour afficher le détail d'un candidature ou alternance.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CandidatureService } from '../../services/candidature.service';
import { Candidature } from '../../models/candidature.model';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  cvUrl: SafeResourceUrl | null = null;
  lettreUrl: SafeResourceUrl | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    public authService: AuthService, 
    private route: ActivatedRoute,
    private router: Router,
    private candidatureService: CandidatureService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.candidatureId = +id;
      this.cvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `http://localhost:8080/api/candidatures/${this.candidatureId}/download-cv`
      );
      this.lettreUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `http://localhost:8080/api/candidatures/${this.candidatureId}/download-lettre`
      );
      this.candidatureService.getCandidatureById(+id).subscribe({
        next: data => {
            if (data){
              data.dateCandidature = new Date(data.dateCandidature).toISOString();
              data.dateDisponibilite = new Date(data.dateDisponibilite).toISOString();
            }
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
    console.log("Tentative de modification", this.candidatureId);
    if (this.candidatureId) {
      this.router.navigate(['/candidatures/edit', this.candidatureId]);
    } else {
      console.error("Pas d'ID trouvé !");
    }
  }

  supprimerCandidature() {
    if (this.candidatureId) {
      this.alertService.confirm('Es-tu sûr de vouloir supprimer cette candidature ?')
      .then((result) => {
        if (result.isConfirmed && this.candidatureId) {
          this.candidatureService.deleteCandidature(this.candidatureId).subscribe(() => {
            this.alertService.success('La candidature a été supprimée avec succès.')
            .then(() => {
              this.router.navigate(['/candidatures']);
            });
          });
        }
      });
    } else {
      console.error("Pas d'ID trouvé !");
    }
  }

  downloadCv(): void {
    if(this.candidature)
    this.candidatureService.downloadCv(this.candidature.id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      if(this.candidature)
      link.download = this.candidature.cvFilename || 'cv.pdf';
      link.click();
    }, err => {
      this.alertService.error("❌ CV introuvable ou erreur lors du téléchargement.");
    });
  }

  downloadLettre(): void {
    if(this.candidature)
    this.candidatureService.downloadLettre(this.candidature.id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      if(this.candidature)
      link.download = this.candidature.cvFilename || 'lettre.pdf';
      link.click();
    }, err => {
      this.alertService.error("❌ Lettre de motivation introuvable ou erreur lors du téléchargement.");
    });
  }
}