import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrepriseService } from '../../services/entreprise.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Entreprise } from '../../models/entreprise.model';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-entreprise-edit',
  standalone: true,
  templateUrl: '../../pages/edit/entreprise-edit.component.html',
  styleUrls: ['../../css/edit/entreprise-edit.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class EntrepriseEditComponent implements OnInit {
  entrepriseForm: FormGroup;
  entrepriseId: number | undefined;
  userId: number | undefined;
  message: string = ''; // ➔ Ajout d'un champ pour afficher les messages
  messageType: 'success' | 'error' | '' = ''; // ➔ Pour changer la couleur du message

  constructor(
    private fb: FormBuilder,
    private entrepriseService: EntrepriseService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {
    this.entrepriseForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      siteWeb: ['', Validators.required],
      secteurActivite: ['', Validators.required],
      password: ['', Validators.required],
      user: []
    });
  }

  ngOnInit(): void {
    this.entrepriseId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.entrepriseId) {
      this.entrepriseService.getEntrepriseById(this.entrepriseId).subscribe((entreprise) => {
        this.entrepriseForm.patchValue({
        nom: entreprise?.nom,
        email: entreprise?.user.email,
        telephone: entreprise?.telephone,
        adresse: entreprise?.adresse,
        siteWeb: entreprise?.siteWeb,
        secteurActivite: entreprise?.secteurActivite,
        password: entreprise?.user.password,
        user: entreprise?.user
        });
        this.userId = entreprise?.user.id;
      });
    }
  }

  onSubmit() {
    if (this.entrepriseForm.valid && this.entrepriseId && this.userId) {

      this.entrepriseForm.value.user.email = this.entrepriseForm.value.email;
      this.entrepriseForm.value.user.password = this.entrepriseForm.value.password;

      const updatedUser = {
        email: this.entrepriseForm.value.email,
        motDePasse: this.entrepriseForm.value.password,
      };

      const updateEntreprise: Entreprise = {
        id: this.entrepriseId,
        nom: this.entrepriseForm.value.nom,
        telephone: this.entrepriseForm.value.telephone,
        adresse: this.entrepriseForm.value.adresse,
        siteWeb: this.entrepriseForm.value.siteWeb,
        secteurActivite: this.entrepriseForm.value.secteurActivite,
        user: this.entrepriseForm.value.user,
      }

      this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: () => {
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du user', err);
      }
      });
      this.entrepriseService.updateEntreprise(this.entrepriseId, updateEntreprise).subscribe({
        next: () => {
          this.messageType = 'success';
          this.message = '✅ Entreprise modifiée avec succès !';
          this.alertService.success(this.message)
          .then(() => {
            // Rediriger après quelques secondes
            //setTimeout(() => {
              this.router.navigate(['/entreprises', this.entrepriseId]);
            //}, 2000);
          });
        },
        error: (err) => {
          console.error('Erreur lors de la modification de l\'entreprise', err);
          this.messageType = 'error';
          this.message = '❌ Erreur lors de la modification de l\'entreprise.';
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
        this.router.navigate(['/entreprises', this.entrepriseId]);
      }
    });
  }
}