// 📄 admin-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../models/admin.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-edit',
  standalone: true,
  templateUrl: '../../pages/edit/admin-edit.component.html',
  styleUrls: ['../../css/edit/admin-edit.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AdminEditComponent implements OnInit {
  adminForm: FormGroup;
  adminId: number | undefined;
  userId: number | undefined;
  message: string = ''; // ➔ Ajout d'un champ pour afficher les messages
  messageType: 'success' | 'error' | '' = ''; // ➔ Pour changer la couleur du message

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private adminService: AdminService,
    private userService: UserService
  ) {
    this.adminForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      password: ['', Validators.required],
      user: []
    });
  }

  ngOnInit(): void {
    this.adminId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.adminId) {
      this.adminService.getAdminById(this.adminId).subscribe((admin) => {
        this.adminForm.patchValue({
          nom: admin?.nom,
          prenom: admin?.prenom,
          email: admin?.user.email,
          telephone: admin?.telephone,
          adresse: admin?.adresse,
          password: admin?.user.password,
          user: admin?.user
        });
        this.userId = admin?.user.id;
      });
    }
  }

  onSubmit() {
    if (this.adminForm.valid && this.adminId) {

      this.adminForm.value.user.email = this.adminForm.value.email;
      this.adminForm.value.user.password = this.adminForm.value.password;

      const updatedAdmin: Admin = {
        id: this.adminId,
        nom: this.adminForm.value.nom,
        prenom: this.adminForm.value.prenom,
        telephone: this.adminForm.value.telephone,
        adresse: this.adminForm.value.adresse,
        user: this.adminForm.value.user,
      };

      this.adminService.updateAdmin(this.adminId, updatedAdmin).subscribe({
        next: () => {
          this.messageType = 'success';
          this.message = '✅ Admin modifié avec succès !';
          // Rediriger après quelques secondes
          setTimeout(() => {
            this.router.navigate(['/admins', this.adminId]);
          }, 2000);
        },
        error: (err) => {
          console.error('Erreur lors de la modification de l\'admin', err);
          this.messageType = 'error';
          this.message = '❌ Erreur lors de la modification de l\'admin.';
        }
      });
    } else {
      alert('Merci de remplir correctement le formulaire ✅');
    }
  }

  annuler() {
    this.router.navigate(['/admins', this.adminId]);
  }
}