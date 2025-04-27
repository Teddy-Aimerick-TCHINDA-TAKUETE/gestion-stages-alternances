import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../../pages/autre/contact.component.html',
  styleUrls: ['../../css/autre/contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  message: string = ''; // ➔ Ajout d'un champ pour afficher les messages
  messageType: 'success' | 'error' | '' = ''; // ➔ Pour changer la couleur du message

  constructor(private fb: FormBuilder, private router: Router, private alertService: AlertService) {
    this.contactForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Message envoyé !', this.contactForm.value);
      this.messageType = 'success';
      this.message = '✅ Votre message a été envoyé !';
      this.alertService.success(this.message)
      .then(() => {
        // Rediriger après quelques secondes
        //setTimeout(() => {
          this.contactForm.reset();
          //this.router.navigate(['/home']);
        //}, 2000);
      });
    } else {
      this.messageType = 'error';
      this.message = '⚠️ Merci de remplir tous les champs correctement.';
      this.alertService.error(this.message);
    }
  }
}