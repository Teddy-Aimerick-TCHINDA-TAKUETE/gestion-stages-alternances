import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantService } from '../../services/etudiant.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Etudiant } from '../../models/etudiant.model';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

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
  userId: number | undefined;
  message: string = ''; // ➔ Ajout d'un champ pour afficher les messages
  messageType: 'success' | 'error' | '' = ''; // ➔ Pour changer la couleur du message

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private etudiantService: EtudiantService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
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
      password: [''],
      oldPassword: [''],
      newPassword: [''],
      confirmPassword: [''],
      user: []
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
        password: etudiant?.user.password,
        user: etudiant?.user
        });
        if(this.authService.isAdmin())
          this.etudiantForm.patchValue({oldPassword: etudiant?.user.password,});
        this.userId = etudiant?.user.id;
      });
    }
  }

  onSubmit() {
    console.log("Ohay a ce niveau!");
    if (this.etudiantForm.valid && this.etudiantId && this.userId) {

      if (this.etudiantForm.hasError('passwordMismatch')) {
        this.messageType = 'error';
        this.message = '❌ Les nouveaux mots de passe ne correspondent pas.';
        this.alertService.error(this.message);
        return;
      }

      const passwordUpdate = {
        oldPassword: this.etudiantForm.value.oldPassword,
        newPassword: this.etudiantForm.value.newPassword
      }

      //this.etudiantForm.value.password = this.etudiantForm.value.newPassword;
      this.etudiantForm.value.user.email = this.etudiantForm.value.email;
      this.etudiantForm.value.user.password = this.etudiantForm.value.password;

      const updatedUser = {
        email: this.etudiantForm.value.email,
        password: this.etudiantForm.value.Password,
      };

      const updateEtudiant: Etudiant = {
        id: this.etudiantId,
        nom: this.etudiantForm.value.nom,
        prenom: this.etudiantForm.value.prenom,
        telephone: this.etudiantForm.value.telephone,
        adresse: this.etudiantForm.value.adresse,
        niveauEtude: this.etudiantForm.value.niveauEtude,
        specialite: this.etudiantForm.value.specialite,
        user: this.etudiantForm.value.user
      }

      /*if(this.authService.isAdmin()){
        if(this.userId)
          this.userService.updateUser(this.userId, updatedUser).subscribe({
          next: () => {
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour du user', err);
          }
          });
        if(this.etudiantId)
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
      } else{ */
      /*this.userService.verifyPassword(this.userId, this.etudiantForm.value.oldPassword).subscribe({
        next: () => {*/
          /*if(this.userId)
            this.userService.updateUser(this.userId, updatedUser).subscribe({
            next: () => {
            },
            error: (err) => {
              console.error('Erreur lors de la mise à jour du user', err);
            }
            });*/
          if(this.etudiantId)
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
        /*},
        error: () => {
          this.messageType = 'error';
          this.message = '❌ Ancien mot de passe incorrect.';
          this.alertService.error(this.message);
        }
      });
      }*/
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