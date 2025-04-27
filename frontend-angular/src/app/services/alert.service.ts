// 📄 alert.service.ts
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  success(message: string) {
    return Swal.fire({
      icon: 'success',
      title: 'Succès',
      text: message,
      confirmButtonColor: '#3085d6'
    });
  }

  error(message: string) {
    return Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: message,
      confirmButtonColor: '#d33'
    });
  }

  confirm(message: string) {
    return Swal.fire({
      title: 'Confirmation',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    });
  }
}