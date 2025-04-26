// =============================
// 📄 etudiant.model.ts
// =============================

import { User } from "./user.model";

/**
 * Modèle de données représentant un étudiant.
 */
export interface Etudiant {
  id: number;
  telephone: string;
  niveauEtude: string;
  specialite: string;
  cv: string;
  user: User;
}