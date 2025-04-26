/**
 * Fichier : stage.model.ts
 * Rôle : Définition du modèle de données TypeScript représentant un stage ou une alternance.
 * Auteur : Teddy
 * Date : 24/04/2025
 */

import { Entreprise } from "./entreprise.model";

export interface Stage {
    id?: number;
    titre: string;
    lieu: string;
    duree: string;
    entreprise: Entreprise;
    type: 'STAGE' | 'ALTERNANCE';
  }