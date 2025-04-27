import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantService } from '../../services/etudiant.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Etudiant } from '../../models/etudiant.model';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-etudiant-edit',
  standalone: true,
  templateUrl: '../../pages/edit/etudiant-edit.component.html',
  styleUrls: ['../../css/edit/etudiant-edit.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class EtudiantEditComponent implements OnInit {
  etudiantForm: FormGroup;
  etudiantId: number | undefined;
  message: string = ''; // ➔ Ajout d'un champ pour afficher les messages
  messageType: 'success' | 'error' | '' = ''; // ➔ Pour changer la couleur du message

  constructor(
    private fb: FormBuilder,
    private etudiantService: EtudiantService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    this.etudiantForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      niveauEtude: ['', Validators.required],
      specialite: ['', Validators.required],
      cv: ['', Validators.required],
      password: ['', Validators.required],
      user: []
    });
  }

  ngOnInit(): void {
    this.etudiantId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.etudiantId) {
      this.etudiantService.getEtudiantById(this.etudiantId).subscribe((etudiant) => {
        this.etudiantForm.patchValue({
        nom: etudiant?.nom,
        prenom: etudiant?.prenom,
        email: etudiant?.user.email,
        telephone: etudiant?.telephone,
        adresse: etudiant?.adresse,
        niveauEtude: etudiant?.niveauEtude,
        specialite: etudiant?.specialite,
        cv: etudiant?.cv,
        password: etudiant?.user.password,
        user: etudiant?.user
        });
      });
    }
  }

  onSubmit() {
    if (this.etudiantForm.valid && this.etudiantId) {
      const updateEtudiant: Etudiant = {
        id: this.etudiantId,
        nom: this.etudiantForm.value.nom,
        prenom: this.etudiantForm.value.prenom,
        telephone: this.etudiantForm.value.telephone,
        adresse: this.etudiantForm.value.adresse,
        niveauEtude: this.etudiantForm.value.niveauEtude,
        specialite: this.etudiantForm.value.specialite,
        cv: this.etudiantForm.value.cv,
        user: this.etudiantForm.value.user
      }
      this.etudiantService.updateEtudiant(this.etudiantId, updateEtudiant).subscribe({
        next: () => {
          this.messageType = 'success';
          this.message = '✅ Étudiant modifié avec succès !';
          this.alertService.success(this.message)
          .then(() => {
            // Rediriger après quelques secondes
            //setTimeout(() => {
              this.router.navigate(['/etudiants', this.etudiantId]);
            //}, 2000);
          });        },
        error: (err) => {
          console.error('Erreur lors de la modification de l\'etudiant', err);
          this.messageType = 'error';
          this.message = '❌ Erreur lors de la modification de l\'etudiant.';
          this.alertService.error(this.message);
        }
      });
    } else {
      this.messageType = 'error';
      this.message = '⚠️ Merci de compléter le formulaire correctement.';
      this.alertService.error(this.message);
    }
  }

  annuler() {
    this.messageType = 'error';
    this.message = '❌ Ete vous sur de vouloir annuler les modifications ?';
    this.alertService.confirm(this.message)
    .then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/etudiants', this.etudiantId]);
      }
    });
  }
}