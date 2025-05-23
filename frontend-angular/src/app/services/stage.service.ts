/**
 * Fichier : stage.service.ts
 * Rôle : Service Angular pour effectuer les requêtes HTTP vers l'API backend des stages.
 * Auteur : Teddy
 * Date : 24/04/2025
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stage } from '../models/stage.model';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  private apiUrl = 'http://localhost:8080/api/stages';

  constructor(private http: HttpClient) {}

  getAllStages(): Observable<Stage[]> {
    return this.http.get<Stage[]>(this.apiUrl);
  }

  getStageById(id: number): Observable<Stage | undefined> {
    return this.http.get<Stage>(`${this.apiUrl}/${id}`);
  }

  getStagesByEntrepriseId(id: number) {
    return this.http.get<Stage[]>(`${this.apiUrl}/entreprises/${id}`);
  }

  createStage(stage: any): Observable<Stage> {
    return this.http.post<Stage>(this.apiUrl, stage);
  }

  updateStage(id: number, stage: any): Observable<Stage> {
    return this.http.put<Stage>(`${this.apiUrl}/${id}`, stage);
  }
  
  deleteStage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}