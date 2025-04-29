import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true; // ✅ L'utilisateur est connecté, il peut accéder
    } else {
      return this.router.parseUrl('/login'); // 🚫 Rediriger vers la page de login sinon
    }
  }
}