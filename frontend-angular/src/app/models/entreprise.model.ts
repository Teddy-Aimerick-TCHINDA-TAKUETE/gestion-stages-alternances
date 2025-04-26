// =============================
// 📄 entreprise.model.ts
// =============================

import { User } from "./user.model";

/**
 * Modèle de données représentant une entreprise.
 */
export interface Entreprise {
  id: number;
  nom: string;
  adresse: string;
  email: string;
  telephone: string;
  secteurActivite: string;
  user: User;
}
