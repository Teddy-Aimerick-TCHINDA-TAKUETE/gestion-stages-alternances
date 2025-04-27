/**
 * Fichier : filtre-type.pipe.ts
 * Rôle : Pipe personnalisé Angular pour filtrer les stages selon leur type (STAGE / ALTERNANCE).
 * Auteur : Teddy
 * Date : 24/04/2025
 */

import { Pipe, PipeTransform } from '@angular/core';
import { Stage } from '../models/stage.model';

@Pipe({
  name: 'filtreType',
  standalone: true
})
export class FiltreTypePipe implements PipeTransform {
  transform(stages: Stage[], typeFiltre: string): Stage[] {
    if (!typeFiltre || typeFiltre === 'Tous') {
      return stages;
    }
    return stages.filter(stage => stage.type && stage.type.toLowerCase() === typeFiltre.toLowerCase());
  }
}
