// =============================
// 📄 candidature.model.ts
// =============================

import { Etudiant } from "./etudiant.model";
import { Stage } from "./stage.model";

/**
 * Modèle de données représentant une candidature à un stage ou alternance.
 */
export interface Candidature {
  id: number;
  dateCandidature: string; // Date ISO ou format lisible
  dateDisponibilite: string;
  message: string;
  statut: 'EN_ATTENTE' | 'ACCEPTEE' | 'REFUSEE';
  etudiant: Etudiant;
  stage: Stage;
}