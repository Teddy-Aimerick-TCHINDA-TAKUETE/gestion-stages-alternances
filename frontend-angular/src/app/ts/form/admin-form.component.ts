// 📄 admin-form.component.ts
// ----------------------------------------------------------------
// Auteur      : Teddy
// Date        : Avril 2025
// Description : Composant Angular pour ajouter une nouvelle offre de admin ou alternance
// ----------------------------------------------------------------

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../../pages/form/admin-form.component.html',
  styleUrls: ['../../css/form/admin-form.component.css']
})
export class AdminFormComponent {
  adminForm: FormGroup;
  message: string = ''; // ➔ Ajout d'un champ pour afficher les messages
  messageType: 'success' | 'error' | '' = ''; // ➔ Pour changer la couleur du message

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {
    // Initialisation du formulaire avec validations
    this.adminForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
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
    if (this.adminForm.valid) {

      if (this.adminForm.hasError('passwordMismatch')) {
        this.messageType = 'error';
        this.message = '❌ Les mots de passe ne correspondent pas.';
        this.alertService.error(this.message);
        return;
      }

      // 1. Construction de l'objet User à partir du formulaire
      const userPayload = {
        email: this.adminForm.value.email,
        password: this.adminForm.value.password,
        role: 'ADMIN' // <-- car c'est un admin
      };
  
      this.userService.createUser(userPayload).subscribe({
        next: (createdUser) => {
          // 2. Maintenant que l'user est créé, on utilise son ID pour créer l'admin
          const adminPayload = {
            nom: this.adminForm.value.nom,
            prenom: this.adminForm.value.prenom,
            telephone: this.adminForm.value.telephone,
            adresse: this.adminForm.value.adresse,
            user: createdUser // <--- important
          };
  
          this.adminService.createAdmin(adminPayload).subscribe({
            next: () => {
              this.messageType = 'success';
              this.message = '✅ Admin créé avec succès !';
              this.alertService.success(this.message)
              .then(() => {
                // Rediriger après quelques secondes
                //setTimeout(() => {
                  this.router.navigate(['/admins']);
                //}, 2000);
              });
            },
            error: (err) => {
              console.error('Erreur lors de la création de l\'admin', err);
              this.messageType = 'error';
              this.message = '❌ Erreur lors de la création de l\'admin.';
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