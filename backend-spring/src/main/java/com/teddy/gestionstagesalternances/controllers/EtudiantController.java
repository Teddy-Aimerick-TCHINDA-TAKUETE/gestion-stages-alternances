package com.teddy.gestionstagesalternances.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teddy.gestionstagesalternances.models.Candidature;
import com.teddy.gestionstagesalternances.models.Etudiant;
import com.teddy.gestionstagesalternances.repositories.CandidatureRepository;
import com.teddy.gestionstagesalternances.services.EtudiantService;

/**
 * Contrôleur REST pour gérer les étudiants.
 */
@RestController
@RequestMapping("/api/etudiants")
public class EtudiantController {

	private final EtudiantService etudiantService;
	private final CandidatureRepository candidatureRepository;

    /**
     * Constructeur avec injection du service de etudiant.
     * @param etudiantService service pour gérer les etudiants
     */
    @Autowired
    public EtudiantController(EtudiantService etudiantService, CandidatureRepository candidatureRepository) {
        this.etudiantService = etudiantService;
        this.candidatureRepository = candidatureRepository;
    }

    /**
     * Récupère tous les étudiants enregistrés.
     * @return liste des étudiants
     */
    @GetMapping
    public List<Etudiant> getAllEtudiants() {
        return etudiantService.getAllEtudiants();
    }

    /**
     * Crée un nouvel étudiant.
     * @param etudiant objet à enregistrer
     * @return étudiant enregistré
     */
    @PostMapping
    public Etudiant createEtudiant(@RequestBody Etudiant etudiant) {
        return etudiantService.createEtudiant(etudiant);
    }
    
    /**
     * Récupère un étudiant par son ID.
     *
     * @param id L'identifiant de l'étudiant.
     * @return L'étudiant s'il existe, sinon une réponse 404.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Etudiant> getEtudiantById(@PathVariable Long id) {
        Optional<Etudiant> etudiant = etudiantService.getEtudiantById(id);
        return etudiant.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    /**
     * ======================================================================
     * PUT /api/etudiants/{id}
     * Met à jour les informations d'un étudiant existant.
     * ======================================================================
     */
    @PutMapping("/{id}")
    public ResponseEntity<Etudiant> updateEtudiant(@PathVariable Long id, @RequestBody Etudiant etudiantDetails) {
        Optional<Etudiant> optionalEtudiant = etudiantService.getEtudiantById(id);
        if (optionalEtudiant.isPresent()) {
            Etudiant etudiant = optionalEtudiant.get();
            etudiant.setNom(etudiantDetails.getNom());
            etudiant.setPrenom(etudiantDetails.getPrenom());
            etudiant.setTelephone(etudiantDetails.getTelephone());
            etudiant.setAdresse(etudiantDetails.getAdresse());
            etudiant.setNiveauEtude(etudiantDetails.getNiveauEtude());
            etudiant.setSpecialite(etudiantDetails.getSpecialite());
            etudiant.setCv(etudiantDetails.getCv());
            etudiant.setUser(etudiantDetails.getUser());
            return ResponseEntity.ok(etudiantService.createEtudiant(etudiant));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * ======================================================================
     * DELETE /api/etudiants/{id}
     * Supprime un étudiant existant par son ID.
     * ======================================================================
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEtudiant(@PathVariable Long id) {
    	Optional<Etudiant> etudiantOpt = etudiantService.getEtudiantById(id);
        if (etudiantService.existsEtudiant(id)) {
        	Etudiant etudiant = etudiantOpt.get();
        	
        	// Supprimer tous les candidatures associés
            List<Candidature> candidatures = candidatureRepository.findByEtudiantId(etudiant.getId());
            for (Candidature candidature : candidatures) {
            	candidatureRepository.delete(candidature);
            }
            
            // Maintenant on peut supprimer l'etudiant
            etudiantService.deleteEtudiant(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
