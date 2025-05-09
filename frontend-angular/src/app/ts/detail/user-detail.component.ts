/**
 * @file user-detail.component.ts
 * @description Composant standalone pour afficher le détail d'un user ou alternance.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: '../../pages/detail/user-detail.component.html',
  styleUrls: ['../../css/detail/user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User | undefined;
  userId: number | undefined;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = +id;
      this.userService.getUserById(+id).subscribe({
        next: data => {
            this.user = data;
          },
          error: err => {
            console.error('Erreur de récupération du user :', err);
            this.user = undefined;
          }
      });
    }
  }

  modifierUser() {
    if (this.userId) {
      this.router.navigate(['/users/edit', this.userId]);
    }
  }

  supprimerUser() {
    if (this.userId) {
      this.alertService.confirm('Es-tu sûr de vouloir supprimer cet utilisateur ?')
      .then((result) => {
        if (result.isConfirmed && this.userId) {
          this.userService.deleteUser(this.userId).subscribe(() => {
            this.alertService.success('L\'utilisateur a été supprimée avec succès.')
            .then(() => {
              this.router.navigate(['/users']);
            });
          });
        }
      });
    } else {
      console.error("Pas d'ID trouvé !");
    }
  }

  modifierMotDePasse() {
    this.router.navigate(['/users/edit/', this.user?.id]);
  }
}