import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Route } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: '../../pages/autre/navbar.component.html',
  styleUrls: ['../../css/autre/navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  // Fonction de déconnexion
  login() {
    this.router.navigate(['/home']);
    const user = this.authService.getCurrentUser();
    if(user)
      this.authService.login(user.email, user.password);
  }

  // Fonction de déconnexion
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  monCompte() {
    if(this.authService.getCurrentUserRole() === 'ADMIN')
      this.router.navigate(['/admins/', this.authService.getCurrentProfilId()]);
    if(this.authService.getCurrentUserRole() === 'ETUDIANT')
      this.router.navigate(['/etudiants/', this.authService.getCurrentProfilId()]);
    if(this.authService.getCurrentUserRole() === 'ENTREPRISE')
      this.router.navigate(['/entreprises/', this.authService.getCurrentProfilId()]);
  }

}