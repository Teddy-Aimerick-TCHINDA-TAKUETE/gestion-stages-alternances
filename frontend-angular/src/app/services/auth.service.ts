// 📄 auth.service.ts
// -------------------------------------------------------------
// Service pour gérer l'utilisateur "connecté" temporairement
// (En attendant une vraie connexion plus tard)
// -------------------------------------------------------------

import { Injectable } from '@angular/core';
import { User } from '../models/user.model'; // 🛠 Adapte si ton chemin diffère !

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null = null;

  constructor() {}

  /**
   * Simule la connexion d'un utilisateur (étudiant, entreprise ou admin)
   * @param user L'utilisateur à connecter
   */
  loginFake(user: User) {
    this.currentUser = user;
  }

  /**
   * Récupère l'utilisateur actuellement connecté
   * @returns L'utilisateur connecté ou null
   */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  /**
   * Déconnecte l'utilisateur actuel
   */
  logout() {
    this.currentUser = null;
  }

  /**
   * Vérifie si un utilisateur est connecté
   * @returns true si connecté, false sinon
   */
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}