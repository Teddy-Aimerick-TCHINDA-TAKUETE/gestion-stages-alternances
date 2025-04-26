// 📁 filtre-statut-candidature.pipe.ts
// ------------------------------------------------------------------
// Auteur      : Teddy
// Date        : Avril 2025
// Description : Pipe Angular pour filtrer une liste de candidatures
//               selon leur statut ("EN_ATTENTE", "ACCEPTEE", etc.)
// ------------------------------------------------------------------

import { Pipe, PipeTransform } from '@angular/core';
import { Candidature } from '../models/candidature.model';

@Pipe({
  name: 'filtreStatutCandidature',
  standalone: true
})
export class FiltreStatutCandidaturePipe implements PipeTransform {
  /**
   * Filtre la liste des candidatures selon le statut donné.
   * @param candidatures Liste complète des candidatures.
   * @param statutFiltre Le statut ciblé (ou 'Tous' pour tout).
   * @returns Liste filtrée.
   */
  transform(candidatures: Candidature[], statutFiltre: string): Candidature[] {
    if (!statutFiltre || statutFiltre === 'Tous') {
      return candidatures;
    }
    return candidatures.filter(c => c.statut.toLowerCase() === statutFiltre.toLowerCase());
  }
}