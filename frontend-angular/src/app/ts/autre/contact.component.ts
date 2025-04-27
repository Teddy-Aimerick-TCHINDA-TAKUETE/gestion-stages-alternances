import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder, private router: Router) {
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
      this.contactForm.reset();
    } else {
      this.messageType = 'error';
      this.message = '⚠️ Merci de remplir tous les champs correctement.';
    }
  }
}