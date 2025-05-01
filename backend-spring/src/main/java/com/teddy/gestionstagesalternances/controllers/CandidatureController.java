package com.teddy.gestionstagesalternances.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.teddy.gestionstagesalternances.models.Candidature;
import com.teddy.gestionstagesalternances.repositories.CandidatureRepository;
import com.teddy.gestionstagesalternances.services.CandidatureService;

/**
 * Contrôleur REST pour gérer les candidatures des étudiants.
 */
@RestController
@RequestMapping("/api/candidatures")
public class CandidatureController {

    private final CandidatureService candidatureService;
    private final CandidatureRepository candidatureRepository;

    /**
     * Constructeur avec injection du service de candidature.
     * @param candidatureService service pour gérer les candidatures
     */
    @Autowired
    public CandidatureController(CandidatureService candidatureService, CandidatureRepository candidatureRepository) {
        this.candidatureService = candidatureService;
        this.candidatureRepository = candidatureRepository;
    }

    /**
     *Récupère les candidatures envoyer par un etudiant.
     * @return liste des candidatures
     */
    @GetMapping("/etudiants/{id}")
    public List<Candidature> getCandidaturesByEtudiant(@PathVariable Long id) {
    	return candidatureService.getCandidaturesByEtudiant(id);
    }
    
    /**
     *Récupère les candidatures reçue par une entreprise.
     * @return liste des candidatures
     */
    @GetMapping("/entreprises/{id}")
    public List<Candidature> getCandidaturesByEntreprise(@PathVariable Long id) {
    	return candidatureService.getCandidaturesByEntreprise(id);
    }
    
    /**
     *Récupère toutes les candidatures enregistrées.
     * @return liste des candidatures
     */
    @GetMapping
    public List<Candidature> getAllCandidatures() {
        return candidatureService.getAllCandidatures();
    }

    /**
     *Crée une nouvelle candidature.
     * La date de candidature est fixée à aujourd'hui et le statut à "EN_ATTENTE".
     * @param candidature Données de la nouvelle candidature.
     * @return La candidature enregistrée.
     */
    @PostMapping
    public Candidature postuler(@RequestBody Candidature candidature) {
    	candidature.setDateCandidature(LocalDate.now());
        candidature.setStatut(Candidature.Statut.EN_ATTENTE);
        return candidatureService.createCandidature(candidature);
    }
    
    /**
     * Met à jour le CV et/ou la lettre de motivation d'une candidature.
     * Accepte des fichiers PDF facultatifs via un formulaire multipart.
     *
     * @param id      ID de la candidature à modifier
     * @param cv      (optionnel) Nouveau fichier CV au format PDF
     * @param lettre  (optionnel) Nouvelle lettre de motivation au format PDF
     * @return        Réponse HTTP avec succès ou erreur
     */
    @PostMapping("/{id}/upload-docs")
    public ResponseEntity<?> uploadDocs(
            @PathVariable Long id,
            @RequestParam(value = "cv", required = false) MultipartFile cv,
            @RequestParam(value = "lettre", required = false) MultipartFile lettre) {
        Optional<Candidature> optional = candidatureRepository.findById(id);
        if (optional.isEmpty()) return ResponseEntity.status(404).body("Candidature introuvable");

        Candidature c = optional.get();
        
        // 📁 Dossier de destination
        String uploadDir = "src/main/resources/uploads/cv/";
        File uploadPath = new File(uploadDir);
        if (!uploadPath.exists()) {
            uploadPath.mkdirs();
        }
        uploadDir = "src/main/resources/uploads/lettres/";
        uploadPath = new File(uploadDir);
        if (!uploadPath.exists()) {
            uploadPath.mkdirs();
        }

        try {
            if (cv != null && !cv.isEmpty()) {
                String cvFilename = "cv_" + id + "_" + cv.getOriginalFilename();
                Path path = Paths.get("src/main/resources/uploads/cv/" + cvFilename);
                Files.write(path, cv.getBytes());
                c.setCvFilename(cvFilename);
            }

            if (lettre != null && !lettre.isEmpty()) {
                String lettreFilename = "lettre_" + id + "_" + lettre.getOriginalFilename();
                Path path = Paths.get("src/main/resources/uploads/lettres/" + lettreFilename);
                Files.write(path, lettre.getBytes());
                c.setLettreMotivationFilename(lettreFilename);
            }

            candidatureRepository.save(c);
            return ResponseEntity.ok(Map.of("message", "Fichiers mis à jour avec succès ✅"));

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erreur lors de l'upload : " + e.getMessage());
        }
    }
    
    /**
     * POST /api/candidatures/{id}/upload-cv
     * Permet à un utilisateur d’uploader un CV pour une candidature.
     * Le fichier est stocké localement, et le nom est enregistré dans la base.
     *
     * @param id L’ID de la candidature
     * @param file Le fichier CV (PDF uniquement)
     * @return Réponse de succès ou d’erreur
     */
    @PostMapping("/{id}/upload-cv")
    public ResponseEntity<?> uploadCv(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) {
        Optional<Candidature> optional = candidatureRepository.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.status(404).body("Candidature introuvable");
        }

        Candidature candidature = optional.get();

        // 📁 Dossier de destination
        String uploadDir = "src/main/resources/uploads/cv/";
        File uploadPath = new File(uploadDir);
        if (!uploadPath.exists()) {
            uploadPath.mkdirs();
        }

        try {
            String originalFilename = file.getOriginalFilename();
            String newFilename = "cv_" + id + "_" + originalFilename;
            Path path = Paths.get(uploadDir + newFilename);
            Files.write(path, file.getBytes());

            // 🔗 Enregistrer le nom dans la candidature
            candidature.setCvFilename(newFilename);
            candidatureRepository.save(candidature);

            return ResponseEntity.ok(Map.of("message", "CV uploadé avec succès ✅"));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur lors de l’upload du fichier");
        }
    }
    
    /**
     * POST /api/candidatures/{id}/upload-lettre
     * Permet d'uploader une lettre de motivation (PDF facultatif) pour une candidature.
     *
     * @param id L'ID de la candidature
     * @param file Le fichier PDF
     * @return Réponse de succès ou d'erreur
     */
    @SuppressWarnings("null")
	@PostMapping("/{id}/upload-lettre")
    public ResponseEntity<?> uploadLettreMotivation(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Optional<Candidature> optional = candidatureRepository.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.status(404).body("Candidature introuvable.");
        }

        if (file.isEmpty() || !file.getOriginalFilename().endsWith(".pdf")) {
            return ResponseEntity.badRequest().body("Seuls les fichiers PDF sont autorisés.");
        }
        // UUID.randomUUID()
        String filename = "lettre_" + id + "_" + file.getOriginalFilename();
        Path filePath = Paths.get("src/main/resources/uploads/lettres/" + filename);

        try {
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());

            Candidature candidature = optional.get();
            candidature.setLettreMotivationFilename(filename);
            candidatureRepository.save(candidature);

            return ResponseEntity.ok(Map.of("message", "Lettre de motivation uploadée avec succès ✅"));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur lors de l'upload de la lettre.");
        }
    }
    
    /**
     * GET /api/candidatures/{id}/download-cv
     * Permet de télécharger le fichier CV associé à une candidature.
     *
     * @param id L’ID de la candidature
     * @return Le fichier en pièce jointe ou une erreur 404
     */
    @GetMapping("/{id}/download-cv")
    public ResponseEntity<?> downloadCv(@PathVariable Long id) {
        Optional<Candidature> optional = candidatureRepository.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.status(404).body("Candidature introuvable");
        }

        Candidature candidature = optional.get();
        String filename = candidature.getCvFilename();

        if (filename == null) {
            return ResponseEntity.status(404).body("Aucun CV associé à cette candidature.");
        }

        Path filePath = Paths.get("src/main/resources/uploads/cv/" + filename);
        if (!Files.exists(filePath)) {
            return ResponseEntity.status(404).body("Fichier introuvable sur le serveur.");
        }

        try {
            byte[] fileBytes = Files.readAllBytes(filePath);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.inline().filename(filename).build());

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(fileBytes);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur lors de la lecture du fichier.");
        }
    }
    
    /**
     * GET /api/candidatures/{id}/download-lettre
     * Permet de télécharger ou prévisualiser la lettre de motivation associée à une candidature.
     *
     * @param id ID de la candidature
     * @return Le fichier PDF ou un message d'erreur
     */
    @GetMapping("/{id}/download-lettre")
    public ResponseEntity<?> downloadLettreMotivation(@PathVariable Long id) {
        Optional<Candidature> optional = candidatureRepository.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.status(404).body("Candidature introuvable.");
        }

        Candidature candidature = optional.get();
        String filename = candidature.getLettreMotivationFilename();

        if (filename == null) {
            return ResponseEntity.status(404).body("Aucune lettre associée.");
        }

        Path filePath = Paths.get("src/main/resources/uploads/lettres/" + filename);
        if (!Files.exists(filePath)) {
            return ResponseEntity.status(404).body("Fichier introuvable sur le serveur.");
        }

        try {
            byte[] fileBytes = Files.readAllBytes(filePath);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.inline().filename(filename).build());

            return ResponseEntity.ok().headers(headers).body(fileBytes);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur lors de la lecture du fichier.");
        }
    }

    /**
     *Récupère une candidature spécifique par son ID.
     * @param id ID de la candidature recherchée.
     * @return Réponse contenant la candidature si trouvée, sinon erreur 404.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Candidature> getCandidatureById(@PathVariable Long id) {
    	Optional<Candidature> candidature = candidatureService.getCandidatureById(id);
        return candidature.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    /**
     * ======================================================================
     * PUT /api/candidatures/{id}
     * Met à jour les informations d'une candidature existante.
     * ======================================================================
     */
    @PutMapping("/{id}")
    public ResponseEntity<Candidature> updateCandidature(@PathVariable Long id, @RequestBody Candidature candidatureDetails) {
        Optional<Candidature> optionalCandidature = candidatureService.getCandidatureById(id);
        if (optionalCandidature.isPresent()) {
            Candidature candidature = optionalCandidature.get();
            candidature.setEtudiant(candidatureDetails.getEtudiant());
            candidature.setStage(candidatureDetails.getStage());
            candidature.setMessage(candidatureDetails.getMessage());
            candidature.setDateCandidature(candidatureDetails.getDateCandidature());
            candidature.setDateDisponibilite(candidatureDetails.getDateDisponibilite());
            candidature.setStatut(candidatureDetails.getStatut());
            return ResponseEntity.ok(candidatureService.createCandidature(candidature));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * ======================================================================
     * DELETE /api/candidatures/{id}
     * Supprime une candidature existante par son ID.
     * ======================================================================
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidature(@PathVariable Long id) {
        if (candidatureService.existsCandidature(id)) {
            candidatureService.deleteCandidature(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
