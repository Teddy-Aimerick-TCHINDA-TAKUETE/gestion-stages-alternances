/**
 * Fichier : admin.service.ts
 * Rôle : Service Angular pour effectuer les requêtes HTTP vers l'API backend des admins.
 * Auteur : Teddy
 * Date : 24/04/2025
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admins';

  constructor(private http: HttpClient) {}

  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.apiUrl);
  }

  getAdminById(id: number): Observable<Admin | undefined> {
    return this.http.get<Admin>(`${this.apiUrl}/${id}`);
  }

  createAdmin(admin: any): Observable<Admin> {
    return this.http.post<Admin>(this.apiUrl, admin);
  }
}