import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: '../../pages/autre/login.component.html',
  styleUrls: ['../../css/autre/login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (data) => {
          this.authService.saveUser(data);
          //alert('Connexion réussie ✅');
          // Redirection en fonction du rôle
          const role = data.user.role;
          if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
            this.router.navigate(['/home']);
          } else if (role === 'ETUDIANT') {
            this.router.navigate(['/home']);
          } else if (role === 'ENTREPRISE') {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          console.error('Erreur de connexion', err);
          this.errorMessage = 'Identifiants invalides. Veuillez réessayer.';
        }
      });
    } else {
      this.errorMessage = 'Merci de remplir tous les champs.';
    }
  }
}