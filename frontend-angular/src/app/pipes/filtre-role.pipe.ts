// 📁 filtre-role.pipe.ts
// ------------------------------------------------------------------
// Auteur      : Teddy
// Date        : Avril 2025
// Description : Pipe Angular pour filtrer une liste d'utilisateurs
//               selon leur rôle (ADMIN, ETUDIANT, ENTREPRISE)
// ------------------------------------------------------------------

import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'filtreRole',
  standalone: true
})
export class FiltreRolePipe implements PipeTransform {
  /**
   * Filtre la liste des utilisateurs selon le rôle donné.
   * @param users Liste complète des utilisateurs.
   * @param roleFiltre Le rôle à filtrer (ou 'Tous' pour tout afficher).
   * @returns Liste filtrée.
   */
  transform(users: User[], roleFiltre: string): User[] {
    if (!roleFiltre || roleFiltre === 'Tous') {
      return users;
    }
    return users.filter(user => user.role && user.role.toLowerCase() === roleFiltre.toLowerCase());
  }
}