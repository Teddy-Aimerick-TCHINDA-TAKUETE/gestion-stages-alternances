import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../../pages/autre/home.component.html',
  styleUrls: ['../../css/autre/home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToStages() {
    this.router.navigate(['/stages']);
  }
}