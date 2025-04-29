import { Component } from '@angular/core';

@Component({
    selector: 'app-unauthorized',
    standalone: true,
    template: `
      <h2>Accès refusé ❌</h2>
      <p>Vous n'avez pas l'autorisation d'accéder à cette page.</p>
      <a routerLink="/home">Retour à l'accueil</a>
    `
  })
  export class UnauthorizedComponent {}