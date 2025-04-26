// 📄 user-form.component.ts
// ----------------------------------------------------------------
// Auteur      : Teddy
// Date        : Avril 2025
// Description : Composant Angular pour ajouter une nouvelle offre de user ou alternance
// ----------------------------------------------------------------

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../pages/user-form.component.html',
  styleUrls: ['../css/user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    // Initialisation du formulaire avec validations
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', Validators.required],
      motDePasse: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe(() => {
        this.router.navigate(['/users']); // Redirection vers la liste
      });
    }
  }
}