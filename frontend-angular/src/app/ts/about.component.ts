import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../pages/about.component.html',
  styleUrls: ['../css/about.component.css']
})
export class AboutComponent {}