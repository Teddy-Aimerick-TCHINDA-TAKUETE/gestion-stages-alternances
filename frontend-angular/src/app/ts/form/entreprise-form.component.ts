// 📄 entreprise-form.component.ts
// ----------------------------------------------------------------
// Auteur      : Teddy
// Date        : Avril 2025
// Description : Composant Angular pour ajouter une nouvelle offre de entreprise ou alternance
// ----------------------------------------------------------------

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EntrepriseService } from '../../services/entreprise.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-entreprise-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../../pages/form/entreprise-form.component.html',
  styleUrls: ['../../css/form/entreprise-form.component.css']
})
export class EntrepriseFormComponent {
  entrepriseForm: FormGroup;
  message: string = ''; // ➔ Ajout d'un champ pour afficher les messages
  messageType: 'success' | 'error' | '' = ''; // ➔ Pour changer la couleur du message

  constructor(
    private fb: FormBuilder,
    private entrepriseService: EntrepriseService,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {
    // Initialisation du formulaire avec validations
    this.entrepriseForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      siteWeb: ['', Validators.required],
      secteurActivite: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.passwordsMatchValidator,
    });
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.entrepriseForm.valid) {

      if (this.entrepriseForm.hasError('passwordMismatch')) {
        this.messageType = 'error';
        this.message = '❌ Les mots de passe ne correspondent pas.';
        this.alertService.error(this.message);
        return;
      }

      // 1. Construction de l'objet User à partir du formulaire
      const userPayload = {
        email: this.entrepriseForm.value.email,
        password: this.entrepriseForm.value.password,
        role: 'ENTREPRISE' // <-- car c'est un entreprise
      };
  
      this.userService.createUser(userPayload).subscribe({
        next: (createdUser) => {
          // 2. Maintenant que l'user est créé, on utilise son ID pour créer l'entreprise
          const entreprisePayload = {
            nom: this.entrepriseForm.value.nom,
            telephone: this.entrepriseForm.value.telephone,
            adresse: this.entrepriseForm.value.adresse,
            siteWeb: this.entrepriseForm.value.siteWeb,
            secteurActivite: this.entrepriseForm.value.secteurActivite,
            user: createdUser // <--- important
          };
  
          this.entrepriseService.createEntreprise(entreprisePayload).subscribe({
            next: () => {
              this.messageType = 'success';
              this.message = '✅ Entreprise créé avec succès !';
              this.alertService.success(this.message)
              .then(() => {
                // Rediriger après quelques secondes
                //setTimeout(() => {
                  this.router.navigate(['/login']);
                //}, 2000);
              });
            },
            error: (err) => {
              console.error('Erreur lors de la création de l\'entreprise', err);
              this.messageType = 'error';
              this.message = '❌ Erreur lors de la création de l\'entreprise.';
              this.alertService.error(this.message);
            }
          });
        },
        error: (err) => {
          console.error('Erreur lors de la création du user', err);
          this.messageType = 'error';
          this.message = '❌ Erreur lors de la création de l\'utilisateur.';
          this.alertService.error(this.message);
        }
      });
  
    } else {
      this.messageType = 'error';
      this.message = '⚠️ Merci de remplir tous les champs requis.';
      this.alertService.error(this.message);
    }
  }
}