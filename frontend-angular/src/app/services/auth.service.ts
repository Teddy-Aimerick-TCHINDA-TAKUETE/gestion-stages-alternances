import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/users';
  private currentUser: User | null = null;
  private currentProfil: any = null;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  // ➡️ Fonction de login : envoie l'email et mot de passe au backend
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  // ➡️ Enregistrer le user connecté dans localStorage
  saveUser(data: { user: User, profil: any }): void {
    localStorage.setItem('profil', JSON.stringify(data.profil));
    localStorage.setItem('user', JSON.stringify(data.user));
    this.currentUser = data.user;
    this.currentProfil = data.profil;
  }

  // ➡️ Récupérer le user connecté
  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.currentUser = JSON.parse(userJson);
      return this.currentUser;
    }
    return null;
  }

  // ➡️ Récupérer le profil connecté
  getCurrentProfil(): any {
    if (this.currentProfil) return this.currentProfil;
    const profilJson = localStorage.getItem('profil');
    if (profilJson) {
      this.currentProfil = JSON.parse(profilJson);
      return this.currentProfil;
    }
    return null;
  }

  // ➡️ Récupérer juste l'ID du user connecté (utile dans guards)
  getCurrentUserId(): number | null {
    return this.getCurrentUser()?.id || null;
  }

  getCurrentProfilId(): number | null {
    return this.getCurrentProfil()?.id || null;
  }

  getAdminId(): number | null {
    return this.isAdmin() ? this.getCurrentProfil()?.id : null;
  }

  getEntrepriseId(): number | null {
    return this.isEntreprise() ? this.getCurrentProfil()?.id : null;
  }
  
  getEtudiantId(): number | null {
    return this.isEtudiant() ? this.getCurrentProfil()?.id : null;
  }

  // ➡️ Vérifie si quelqu’un est connecté
  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  // ➡️ Récupérer le rôle du user
  getCurrentUserRole(): string | null {
    return this.getCurrentUser()?.role || null;
  }

  // ➡️ Déconnexion
  logout(): void {
    localStorage.removeItem('user');
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  // ➡️ Fonctions de rôle (utile dans le template ou les guards)
  isAdmin(): boolean {
    return this.getCurrentUserRole() === 'ADMIN';
  }

  isEtudiant(): boolean {
    return this.getCurrentUserRole() === 'ETUDIANT';
  }

  isEntreprise(): boolean {
    return this.getCurrentUserRole() === 'ENTREPRISE';
  }
}