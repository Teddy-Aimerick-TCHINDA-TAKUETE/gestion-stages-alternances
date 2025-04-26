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
  telephone: string;
  adresse: string;
  siteWeb: string;
  secteurActivite: string;
  user: User;
}
