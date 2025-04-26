// =============================
// 📄 admin.model.ts
// =============================

import { User } from "./user.model";

/**
 * Modèle de données représentant un étudiant.
 */
export interface Admin {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  user: User;
}