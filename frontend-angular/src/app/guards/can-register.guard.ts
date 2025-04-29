import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanRegisterGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const user = this.authService.getCurrentUser();
    if (!user || user.role === 'ADMIN') {
      return true; // ✅ Autoriser si pas connecté ou admin
    } else {
      return this.router.parseUrl('/unauthorized'); // 🚫 Refuser sinon
    }
  }
}