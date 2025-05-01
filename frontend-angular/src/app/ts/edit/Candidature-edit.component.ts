import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StageService } from '../../services/stage.service';
import { Stage } from '../../models/stage.model';
import { EtudiantService } from '../../services/etudiant.service';
import { Etudiant } from '../../models/etudiant.model';
import { CandidatureService } from '../../services/candidature.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-candidature-edit',
  standalone: true,
  templateUrl: '../../pages/edit/candidature-edit.component.html',
  styleUrls: ['../../css/edit/candidature-edit.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CandidatureEditComponent implements OnInit {
  candidatureForm: FormGroup;
  candidatureId: number | undefined;
  stages: Stage[] = [];
  etudiants: Etudiant[] = [];
  statuts: string[] = [ 'EN_ATTENTE', 'ACCEPTEE', 'REFUSEE' ];
  message: string = ''; // ➔ Ajout d'un champ pour afficher les messages
  messageType: 'success' | 'error' | '' = ''; // ➔ Pour changer la couleur du message
  selectedFile: File | null = null;
  cvError: boolean = false;
  pdfPreviewUrl: SafeResourceUrl | null = null;
  cvErrorMessage: string = "";
  lettreMotivationFile: File | null = null;
  lettreMotivationPreviewUrl: SafeResourceUrl | null = null;
  lettreError: boolean = false;
  lettreErrorMessage: string = '';

  constructor(
    private sanitizer: DomSanitizer,
    public authService: AuthService,
    private fb: FormBuilder,
    private candidatureService: CandidatureService,
    private stageService: StageService,
    private etudiantService: EtudiantService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    this.candidatureForm = this.fb.group({
      etudiantId: ['', Validators.required],
      stageId: ['', Validators.required],
      dateCandidature: [''],
      dateDisponibilite: [''],
      statut: [''],
      message: [''],
    });
  }

  ngOnInit(): void {
    this.candidatureId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.candidatureId) {
      this.pdfPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `http://localhost:8080/api/candidatures/${this.candidatureId}/download-cv`
      );
      this.candidatureService.getCandidatureById(this.candidatureId).subscribe((candidature) => {
        this.candidatureForm.patchValue({
        etudiantId: candidature?.etudiant.id,
        stageId: candidature?.stage.id,
        dateCandidature: candidature?.dateCandidature,
        dateDisponibilite: candidature?.dateDisponibilite,
        statut: candidature?.statut,
        message: candidature?.message,
        });
        if(candidature?.lettreMotivationFilename)
          this.lettreMotivationPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `http://localhost:8080/api/candidatures/${this.candidatureId}/download-lettre`
          );
      });
    }

    this.stageService.getAllStages().subscribe({
      next: (stages) => this.stages = stages,
      error: (err) => console.error('Erreur lors du chargement des stages', err)
    });

    this.etudiantService.getAllEtudiants().subscribe({
      next: (etudiants) => this.etudiants = etudiants,
      error: (err) => console.error('Erreur lors du chargement des étudiants', err)
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
  
    // Si aucun fichier sélectionné
    if (!file){
      this.selectedFile = null;
      this.pdfPreviewUrl = null;
      this.cvError = true;
      this.cvErrorMessage = "⚠️ Le CV est obligatoire pour postuler.";
      return;
    }
  
    // Vérifier le type
    if (file.type !== 'application/pdf') {
      this.selectedFile = null;
      this.pdfPreviewUrl = null;
      this.cvError = true;
      this.cvErrorMessage = "❌ Seuls les fichiers PDF sont autorisés.";
      return;
    }
  
    // Vérifier la taille (2 Mo max)
    const maxSize = 2 * 1024 * 1024; // 2 Mo en octets
    if (file.size > maxSize) {
      this.selectedFile = null;
      this.pdfPreviewUrl = null;
      this.cvError = true;
      this.cvErrorMessage = "❌ Le fichier dépasse la taille maximale de 2 Mo.";
      return;
    }
  
    // ✅ Fichier valide
    this.selectedFile = file;
    this.cvError = false;
    this.cvErrorMessage = "";
  
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const unsafeUrl = e.target.result;
      this.pdfPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
    };
    reader.readAsDataURL(file);
  }

  removeSelectedFile(): void {
    this.selectedFile = null;
    this.cvError = false;
    this.pdfPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `http://localhost:8080/api/candidatures/${this.candidatureId}/download-cv`
    );
  
    // Réinitialiser le champ fichier
    const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  onLettreSelected(event: any) {
    const file = event.target.files[0];
    this.lettreError = false;
    this.lettreErrorMessage = '';
  
    if (file) {
      if (!file.name.endsWith('.pdf')) {
        this.lettreError = true;
        this.lettreErrorMessage = '❌ Seuls les fichiers PDF sont autorisés.';
        return;
      }
  
      if (file.size > 2 * 1024 * 1024) {
        this.lettreError = true;
        this.lettreErrorMessage = '❌ Le fichier doit faire moins de 2 Mo.';
        return;
      }
  
      this.lettreMotivationFile = file;
  
      const reader = new FileReader();
      reader.onload = () => {
        const blob = new Blob([reader.result as ArrayBuffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        this.lettreMotivationPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  clearLettreMotivation() {
    this.lettreMotivationFile = null;
    this.lettreError = false;
    this.lettreMotivationPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `http://localhost:8080/api/candidatures/${this.candidatureId}/download-lettre`
    );
  }

  onSubmit() {

    /*if (!this.selectedFile) {
      this.selectedFile = null;
      this.pdfPreviewUrl = null;
      this.cvError = true;
      this.cvErrorMessage = "⚠️ Le CV est obligatoire pour postuler.";
      return;
    }*/
  
    this.cvError = false;
    this.lettreError = false;

    if (this.candidatureForm.valid && this.candidatureId) {
      const candidaturePayload = {
        etudiant: { id: this.candidatureForm.value.etudiantId },
        stage: { id: this.candidatureForm.value.stageId },
        dateCandidature: this.candidatureForm.value.dateCandidature,
        dateDisponibilite: this.candidatureForm.value.dateDisponibilite,
        statut: this.candidatureForm.value.statut,
        message: this.candidatureForm.value.message
        // ⚡ dateCandidature et statut EN_ATTENTE sont ajoutés automatiquement par le backend
      };
      this.candidatureService.updateCandidature(this.candidatureId, candidaturePayload).subscribe({
        next: (createdCandidature) => {

          /*if (this.lettreMotivationFile) {
            this.candidatureService.uploadLettre(createdCandidature.id, this.lettreMotivationFile).subscribe({
                next: () => console.log("Lettre modifiée"),
                error: err => {
                  console.error("Erreur modification lettre : ", err);
                  this.alertService.error("Erreur modification lettre  ");
                }
              });
          }*/

          if (this.selectedFile && this.lettreMotivationFile) {
            this.candidatureService.updateFiles(createdCandidature.id, this.selectedFile, this.lettreMotivationFile).subscribe({
              next: () => {
                this.messageType = 'success';
                this.message = '✅ Candidature modifiée avec succès !';
                this.alertService.success(this.message)
                .then(() => {
                  // Rediriger après quelques secondes
                  //setTimeout(() => {
                    this.router.navigate(['/candidatures', this.candidatureId]);
                  //}, 2000);
                });
              },
              error: () => {
                this.messageType = 'error';
                this.message = '❌ Candidature modifiée avec succès, mais l’upload du CV a échoué.';
                this.alertService.error(this.message);
              }
            });
          } else {
            this.messageType = 'success';
            this.message = '✅ Candidature modifiée avec succès !';
            this.alertService.success(this.message)
            .then(() => {
              // Rediriger après quelques secondes
              //setTimeout(() => {
                this.router.navigate(['/candidatures', this.candidatureId]);
              //}, 2000);
            });
          }
        },
        error: (err) => {
          console.error('Erreur lors de la modification de la candidature', err);
          this.messageType = 'error';
          this.message = '❌ Erreur lors de la modiafication de la candidature.';
          this.alertService.error(this.message);
        }
      });
    } else {
      this.messageType = 'error';
      this.message = '⚠️ Merci de compléter le formulaire correctement.';
      this.alertService.error(this.message);
    }
  }

  annuler() {
    this.messageType = 'error';
    this.message = '❌ Ete vous sur de vouloir annuler les modifications ?';
    this.alertService.confirm(this.message)
    .then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/candidatures', this.candidatureId]);
      }
    });
  }
}