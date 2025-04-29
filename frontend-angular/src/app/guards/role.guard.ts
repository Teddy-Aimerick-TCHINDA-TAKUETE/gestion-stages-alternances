import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const expectedRoles: string[] = route.data['roles'];
    const user = this.authService.getCurrentUser();

    if (user && expectedRoles.includes(user.role)) {
      return true; // ✅ Rôle autorisé
    } else {
      return this.router.parseUrl('/unauthorized'); // 🚫 Page "Accès non autorisé"
    }
  }
}