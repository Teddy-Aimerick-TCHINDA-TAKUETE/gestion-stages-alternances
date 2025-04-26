/**
 * Fichier : entreprise.service.ts
 * Rôle : Service Angular pour effectuer les requêtes HTTP vers l'API backend des entreprises.
 * Auteur : Teddy
 * Date : 24/04/2025
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entreprise } from '../models/entreprise.model';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  private apiUrl = 'http://localhost:8080/api/entreprises';

  constructor(private http: HttpClient) {}

  getAllEntreprises(): Observable<Entreprise[]> {
    return this.http.get<Entreprise[]>(this.apiUrl);
  }

  getEntrepriseById(id: number): Observable<Entreprise | undefined> {
    return this.http.get<Entreprise>(`${this.apiUrl}/${id}`);
  }

  createEntreprise(entreprise: any): Observable<Entreprise> {
    return this.http.post<Entreprise>(this.apiUrl, entreprise);
  }
}