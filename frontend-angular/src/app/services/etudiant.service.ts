/**
 * Fichier : etudiant.service.ts
 * Rôle : Service Angular pour effectuer les requêtes HTTP vers l'API backend des etudiants.
 * Auteur : Teddy
 * Date : 24/04/2025
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etudiant } from '../models/etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private apiUrl = 'http://localhost:8080/api/etudiants';

  constructor(private http: HttpClient) {}

  getAllEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.apiUrl);
  }

  getEtudiantById(id: number): Observable<Etudiant | undefined> {
    return this.http.get<Etudiant>(`${this.apiUrl}/${id}`);
  }

  createEtudiant(etudiant: any): Observable<Etudiant> {
    return this.http.post<Etudiant>(this.apiUrl, etudiant);
  }
}