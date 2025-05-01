import { Routes } from '@angular/router';
import { AboutComponent } from './ts/autre/about.component';
import { ChoixInscriptionComponent } from './ts/autre/choix-inscription.component';
import { ContactComponent } from './ts/autre/contact.component';
import { HomeComponent } from './ts/autre/home.component';
import { LoginComponent } from './ts/autre/login.component';
import { UnauthorizedComponent } from './ts/autre/unauthorized.component';
import { AdminListComponent } from './ts/list/admin-list.component';
import { AdminFormComponent } from './ts/form/admin-form.component';
import { AdminDetailComponent } from './ts/detail/admin-detail.component';
import { CandidatureListComponent } from './ts/list/candidature-list.component';
import { CandidatureFormComponent } from './ts/form/candidature-form.component';
import { CandidatureDetailComponent } from './ts/detail/candidature-detail.component';
import { EntrepriseListComponent } from './ts/list/entreprise-list.component';
import { EntrepriseFormComponent } from './ts/form/entreprise-form.component';
import { EntrepriseDetailComponent } from './ts/detail/entreprise-detail.component';
import { EtudiantListComponent } from './ts/list/etudiant-list.component';
import { EtudiantFormComponent } from './ts/form/etudiant-form.component';
import { EtudiantDetailComponent } from './ts/detail/etudiant-detail.component';
import { StageListComponent } from './ts/list/stage-list.component';
import { StageFormComponent } from './ts/form/stage-form.component';
import { StageDetailComponent } from './ts/detail/stage-detail.component';
import { UserListComponent } from './ts/list/user-list.component';
import { UserFormComponent } from './ts/form/user-form.component';
import { UserDetailComponent } from './ts/detail/user-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { CanRegisterGuard } from './guards/can-register.guard';
import { OwnerGuard } from './guards/owner.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'choix-inscription', component: ChoixInscriptionComponent, canActivate: [CanRegisterGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'home', component: HomeComponent },
  { path: 'index', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [CanRegisterGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },

  { path: 'admins', component: AdminListComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] } },
  { path: 'admins/create', component: AdminFormComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] } },
  { path: 'admins/edit/:id', loadComponent: () => import('./ts/edit/admin-edit.component').then(m => m.AdminEditComponent), canActivate: [AuthGuard, RoleGuard, OwnerGuard], data: { roles: ['ADMIN'], role: 'ADMIN' } },
  { path: 'admins/:id', component: AdminDetailComponent, canActivate: [AuthGuard, RoleGuard, OwnerGuard], data: { roles: ['ADMIN'], role: 'ADMIN' } },

  { path: 'candidatures', component: CandidatureListComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'ENTREPRISE', 'ETUDIANT'] } },
  { path: 'candidatures/create', component: CandidatureFormComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'ETUDIANT'] } },
  { path: 'candidatures/create/:id', loadComponent: () => import('./ts/form/candidature-form.component').then(m => m.CandidatureFormComponent), canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'ETUDIANT'] } },
  { path: 'candidatures/edit/:id', loadComponent: () => import('./ts/edit/candidature-edit.component').then(m => m.CandidatureEditComponent), canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'ENTREPRISE', 'ETUDIANT'] } },
  { path: 'candidatures/:id', component: CandidatureDetailComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'ENTREPRISE', 'ETUDIANT'] } },

  { path: 'entreprises', component: EntrepriseListComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] } },
  { path: 'entreprises/create', component: EntrepriseFormComponent, canActivate: [CanRegisterGuard] },
  { path: 'entreprises/edit/:id', loadComponent: () => import('./ts/edit/entreprise-edit.component').then(m => m.EntrepriseEditComponent), canActivate: [AuthGuard, RoleGuard, OwnerGuard], data: { roles: ['ADMIN', 'ENTREPRISE'], role: 'ENTREPRISE' } },
  { path: 'entreprises/:id', component: EntrepriseDetailComponent, canActivate: [AuthGuard, RoleGuard, OwnerGuard], data: { roles: ['ADMIN', 'ENTREPRISE'], role: 'ENTREPRISE' } },

  { path: 'etudiants', component: EtudiantListComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] } },
  { path: 'etudiants/create', component: EtudiantFormComponent, canActivate: [CanRegisterGuard] },
  { path: 'etudiants/edit/:id', loadComponent: () => import('./ts/edit/etudiant-edit.component').then(m => m.EtudiantEditComponent), canActivate: [AuthGuard, RoleGuard, OwnerGuard], data: { roles: ['ADMIN', 'ETUDIANT'], role: 'ETUDIANT' } },
  { path: 'etudiants/:id', component: EtudiantDetailComponent, canActivate: [AuthGuard, RoleGuard, OwnerGuard], data: { roles: ['ADMIN', 'ETUDIANT'], role: 'ETUDIANT' } },

  { path: 'stages', component: StageListComponent },
  { path: 'stages/create', component: StageFormComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'ENTREPRISE'] } },
  { path: 'stages/edit/:id', loadComponent: () => import('./ts/edit/stage-edit.component').then(m => m.StageEditComponent), canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'ENTREPRISE'] } },
  { path: 'stages/:id', component: StageDetailComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'ENTREPRISE', 'ETUDIANT'] } },

  { path: 'users', component: UserListComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] } },
  { path: 'users/create', component: UserFormComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] } },
  { path: 'users/edit/:id', loadComponent: () => import('./ts/edit/user-edit.component').then(m => m.UserEditComponent), canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] } },
  { path: 'users/:id', component: UserDetailComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] } },
];