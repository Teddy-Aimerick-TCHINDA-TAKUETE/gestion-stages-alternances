import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

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
    public authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  passwordsMatchValidator(form: FormGroup) {
    const newPass = form.get('newPassword')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return newPass === confirm ? null : { passwordMismatch: true };
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
        if(this.authService.getCurrentUserRole() === 'SUPER_ADMIN')
          this.userForm.patchValue({oldPassword: user?.password,});
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid && this.userId) {

      if (this.userForm.hasError('passwordMismatch')) {
        this.messageType = 'error';
        this.message = '❌ Les nouveaux mots de passe ne correspondent pas.';
        this.alertService.error(this.message);
        return;
      }

      const passwordUpdate = {
        oldPassword: this.userForm.value.oldPassword,
        newPassword: this.userForm.value.newPassword
      }

      this.userForm.value.password = this.userForm.value.newPassword;

      const updateUser: User = {
        id: this.userId,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        role: this.userForm.value.role
      }

      if(this.authService.getCurrentUserRole() === 'SUPER_ADMIN'){
        if(this.userId)
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
      } else{
      this.userService.verifyPassword(this.userId, this.userForm.value.oldPassword).subscribe({
        next: () => {
          if(this.userId)
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
        },
        error: () => {
          this.messageType = 'error';
          this.message = '❌ Ancien mot de passe incorrect.';
          this.alertService.error(this.message);
        }
      });
      }
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