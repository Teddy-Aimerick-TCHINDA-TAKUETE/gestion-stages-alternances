// =============================
// 📄 user.model.ts
// =============================

/**
 * Modèle utilisateur de l'application avec rôle pour distinction.
 */
export interface User {
  id: number;
  nom: string;
  email: string;
  role: 'ADMIN' | 'ETUDIANT' | 'ENTREPRISE';
}