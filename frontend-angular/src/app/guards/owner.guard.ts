import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const user = this.authService.getCurrentUser();
    const idInUrl = Number(route.paramMap.get('id'));
    const expectedRoles: string = route.data['role'];

    if (!user) {
      // Pas connecté → rediriger vers login
      return this.router.parseUrl('/login');
    }

    if (!idInUrl) {
      // Pas d'ID → on refuse aussi
      return this.router.parseUrl('/unauthorized');
    }

    // Super Admin
    if(user && user.role === 'SUPER_ADMIN'){
      return true;
    }

    // ADMIN peut tout faire
    if (user.role === 'ADMIN' && expectedRoles === 'ADMIN' && this.authService.getCurrentProfilId() === idInUrl) {
      return true;
    }

    if (user.role === 'ADMIN' && expectedRoles === 'USER' && this.authService.getCurrentUserId() === idInUrl) {
      return true;
    }

    if (user.role === 'ADMIN' && expectedRoles === 'ETUDIANT') {
      return true;
    }

    if (user.role === 'ADMIN' && expectedRoles === 'ENTREPRISE') {
      return true;
    }

    // ETUDIANT accède à son propre profil
    if (user.role === 'ETUDIANT' && expectedRoles === 'ETUDIANT' && this.authService.getCurrentProfilId() === idInUrl) {
      return true;
    }

    // ENTREPRISE accède à son propre profil
    if (user.role === 'ENTREPRISE' && expectedRoles === 'ENTREPRISE' && this.authService.getCurrentProfilId() === idInUrl) {
      return true;
    }

    // Sinon accès refusé
    return this.router.parseUrl('/unauthorized');
  }
}