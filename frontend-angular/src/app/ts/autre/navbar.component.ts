import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
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
export class NavbarComponent implements OnInit {

  navbarActive: boolean = false;
  menuOuvert: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Fermer le menu quand on change de route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuOuvert = false;
      }
    });
  }

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
    if(this.authService.getCurrentUserRole() === 'ADMIN' || this.authService.getCurrentUserRole() === 'SUPER_ADMIN')
      this.router.navigate(['/admins/', this.authService.getCurrentProfilId()]);
    if(this.authService.getCurrentUserRole() === 'ETUDIANT')
      this.router.navigate(['/etudiants/', this.authService.getCurrentProfilId()]);
    if(this.authService.getCurrentUserRole() === 'ENTREPRISE')
      this.router.navigate(['/entreprises/', this.authService.getCurrentProfilId()]);
  }

  toggleNavbar() {
    this.navbarActive = !this.navbarActive;
  }

  toggleMenu() {
    this.menuOuvert = !this.menuOuvert;
  }

}