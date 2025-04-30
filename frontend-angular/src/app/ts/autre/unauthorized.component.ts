import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="unauthorized-container">
      <div class="unauthorized-card">
        <div class="emoji">🚫</div>
        <h2>Accès refusé</h2>
        <p>Vous n'avez pas l'autorisation d'accéder à cette page.</p>
        <a routerLink="/home" class="back-button">Retour à l'accueil</a>
      </div>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
      background-color: #f8f9fa;
      text-align: center;
    }

    .unauthorized-card {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 90%;
    }

    .emoji {
      font-size: 64px;
      margin-bottom: 10px;
    }

    h2 {
      color: #dc3545;
      font-size: 1.8rem;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.1rem;
      margin-bottom: 25px;
      color: #333;
    }

    .back-button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border-radius: 6px;
      text-decoration: none;
      transition: background-color 0.3s ease;
    }

    .back-button:hover {
      background-color: #0056b3;
    }
  `]
})
export class UnauthorizedComponent {}