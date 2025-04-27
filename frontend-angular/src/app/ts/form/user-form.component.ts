// 📄 user-form.component.ts
// ----------------------------------------------------------------
// Auteur      : Teddy
// Date        : Avril 2025
// Description : Composant Angular pour ajouter une nouvelle offre de user ou alternance
// ----------------------------------------------------------------

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../../pages/form/user-form.component.html',
  styleUrls: ['../../css/form/user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;
  message: string = ''; // ➔ Ajout d'un champ pour afficher les messages
  messageType: 'success' | 'error' | '' = ''; // ➔ Pour changer la couleur du message

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    // Initialisation du formulaire avec validations
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.userForm.valid) {
      const userPayload = {
        email: this.userForm.value.email,
        password: this.userForm.value.password
      };

      this.userService.createUser(userPayload).subscribe({
        next: () => {
          this.messageType = 'success';
          this.message = '✅ Utilisateur créé avec succès !';
          // Rediriger après quelques secondes
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 2000);
        },
        error: (err) => {
          console.error('Erreur lors de la création de l\'utilisateur', err);
          this.messageType = 'error';
          this.message = '❌ Erreur lors de la création de l\'utilisateur.';
        }
      });
    } else {
      this.messageType = 'error';
      this.message = '⚠️ Merci de remplir tous les champs requis.';
    }
  }
}