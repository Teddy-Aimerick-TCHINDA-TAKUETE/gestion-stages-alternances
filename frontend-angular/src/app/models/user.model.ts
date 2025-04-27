// =============================
// 📄 user.model.ts
// =============================

/**
 * Modèle utilisateur de l'application avec rôle pour distinction.
 */
export interface User {
  id: number;
  email: string;
  password: string;
  role: 'ADMIN' | 'ETUDIANT' | 'ENTREPRISE';
}