import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: '../../pages/autre/footer.component.html',
  styleUrls: ['../../css/autre/footer.component.css']
})
export class FooterComponent {

}
