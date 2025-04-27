/**
 * Fichier : candidature.service.ts
 * Rôle : Service Angular pour effectuer les requêtes HTTP vers l'API backend des candidatures.
 * Auteur : Teddy
 * Date : 24/04/2025
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidature } from '../models/candidature.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private apiUrl = 'http://localhost:8080/api/candidatures';

  constructor(private http: HttpClient) {}

  getAllCandidatures(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(this.apiUrl);
  }

  getCandidatureById(id: number): Observable<Candidature | undefined> {
    return this.http.get<Candidature>(`${this.apiUrl}/${id}`);
  }

  createCandidature(candidature: any): Observable<Candidature> {
    return this.http.post<Candidature>(this.apiUrl, candidature);
  }

  updateCandidature(id: number, candidature: any): Observable<Candidature> {
    return this.http.put<Candidature>(`${this.apiUrl}/${id}`, candidature);
  }
  
  deleteCandidature(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}