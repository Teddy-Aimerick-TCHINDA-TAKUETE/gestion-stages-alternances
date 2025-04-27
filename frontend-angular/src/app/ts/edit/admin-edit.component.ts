// 📄 admin-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../models/admin.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.adminForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.adminId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.adminId) {
      this.adminService.getAdminById(this.adminId).subscribe((admin) => {
        this.adminForm.patchValue({
          nom: admin.nom,
          prenom: admin.prenom,
          telephone: admin.telephone,
          adresse: admin.adresse
        });
      });
    }
  }

  onSubmit() {
    if (this.adminForm.valid && this.adminId) {
      const updatedAdmin: Admin = {
        id: this.adminId,
        nom: this.adminForm.value.nom,
        prenom: this.adminForm.value.prenom,
        telephone: this.adminForm.value.telephone,
        adresse: this.adminForm.value.adresse,
        user: undefined // on ne touche pas au user ici
      };

      this.adminService.updateAdmin(this.adminId, updatedAdmin).subscribe(() => {
        alert('Admin modifié avec succès ! 🎉');
        this.router.navigate(['/admins']);
      });
    } else {
      alert('Merci de remplir correctement le formulaire ✅');
    }
  }

  annuler() {
    this.router.navigate(['/admins']);
  }
}