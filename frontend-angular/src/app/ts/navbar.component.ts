import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: '../pages/navbar.component.html',
  styleUrls: ['../css/navbar.component.css']
})
export class NavbarComponent {}