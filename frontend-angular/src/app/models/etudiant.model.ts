// =============================
// 📄 etudiant.model.ts
// =============================

import { User } from "./user.model";

/**
 * Modèle de données représentant un étudiant.
 */
export interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  niveauEtude: string;
  specialite: string;
  user: User;
}