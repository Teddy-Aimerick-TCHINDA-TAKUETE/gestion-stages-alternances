import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  templateUrl: '../../pages/edit/user-edit.component.html',
  styleUrls: ['../../css/edit/user-edit.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  userId: number | undefined;
  message: string = ''; // ➔ Ajout d'un champ pour afficher les messages
  messageType: 'success' | 'error' | '' = ''; // ➔ Pour changer la couleur du message

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((user) => {
        this.userForm.patchValue({
        email: user?.email,
        password: user?.password,
        role: user?.role
        });
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid && this.userId) {
      const updateUser: User = {
        id: this.userId,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        role: this.userForm.value.role
      }
      this.userService.updateUser(this.userId, updateUser).subscribe({
        next: () => {
          this.messageType = 'success';
          this.message = '✅ Utilisateur modifié avec succès !';
          this.alertService.success(this.message)
          .then(() => {
            // Rediriger après quelques secondes
            //setTimeout(() => {
              this.router.navigate(['/users', this.userId]);
            //}, 2000);
          });
        },
        error: (err) => {
          console.error('Erreur lors de la modification de l\'utilisateur', err);
          this.messageType = 'error';
          this.message = '❌ Erreur lors de la modification de l\'utilisateur.';
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
        this.router.navigate(['/users', this.userId]);
      }
    });
  }
}