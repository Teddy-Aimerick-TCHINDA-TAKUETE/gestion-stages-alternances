// 📄 etudiant-form.component.ts
// ----------------------------------------------------------------
// Auteur      : Teddy
// Date        : Avril 2025
// Description : Composant Angular pour ajouter une nouvelle offre de etudiant ou alternance
// ----------------------------------------------------------------

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EtudiantService } from '../../services/etudiant.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-etudiant-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../../pages/form/etudiant-form.component.html',
  styleUrls: ['../../css/form/etudiant-form.component.css']
})
export class EtudiantFormComponent {
  etudiantForm: FormGroup;
  message: string = ''; // ➔ Ajout d'un champ pour afficher les messages
  messageType: 'success' | 'error' | '' = ''; // ➔ Pour changer la couleur du message

  constructor(
    private fb: FormBuilder,
    private etudiantService: EtudiantService,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {
    // Initialisation du formulaire avec validations
    this.etudiantForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      niveauEtude: ['', Validators.required],
      specialite: ['', Validators.required],
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
    if (this.etudiantForm.valid) {

      if (this.etudiantForm.hasError('passwordMismatch')) {
        this.messageType = 'error';
        this.message = '❌ Les mots de passe ne correspondent pas.';
        this.alertService.error(this.message);
        return;
      }

      // 1. Construction de l'objet User à partir du formulaire
      const userPayload = {
        email: this.etudiantForm.value.email,
        password: this.etudiantForm.value.password,
        role: 'ETUDIANT' // <-- car c'est un etudiant
      };
  
      this.userService.createUser(userPayload).subscribe({
        next: (createdUser) => {
          // 2. Maintenant que l'user est créé, on utilise son ID pour créer l'etudiant
          const etudiantPayload = {
            nom: this.etudiantForm.value.nom,
            prenom: this.etudiantForm.value.prenom,
            telephone: this.etudiantForm.value.telephone,
            adresse: this.etudiantForm.value.adresse,
            niveauEtude: this.etudiantForm.value.niveauEtude,
            specialite: this.etudiantForm.value.specialite,
            user: createdUser // <--- important
          };
  
          this.etudiantService.createEtudiant(etudiantPayload).subscribe({
            next: () => {
              this.messageType = 'success';
              this.message = '✅ Etudiant créé avec succès !';
              this.alertService.success(this.message)
              .then(() => {
                // Rediriger après quelques secondes
                //setTimeout(() => {
                  this.router.navigate(['/login']);
                //}, 2000);
              });
            },
            error: (err) => {
              console.error('Erreur lors de la création de l\'etudiant', err);
              this.messageType = 'error';
              this.message = '❌ Erreur lors de la création de l\'etudiant.';
              this.alertService.error(this.message);
            }
          });
        },
        error: (err) => {
          console.error('Erreur lors de la création du user', err);
          this.messageType = 'error';
          this.message = '❌ Erreur lors de la création de l\'utilisateur.'
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