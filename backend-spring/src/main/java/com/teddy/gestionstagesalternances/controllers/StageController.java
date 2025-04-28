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
import com.teddy.gestionstagesalternances.models.Stage;
import com.teddy.gestionstagesalternances.repositories.CandidatureRepository;
import com.teddy.gestionstagesalternances.services.StageService;

/**
 * Contrôleur REST pour gérer les offres de stages.
 * Fournit les endpoints pour consulter et créer des stages.
 */
@RestController
@RequestMapping("/api/stages")
public class StageController {

	private final StageService stageService;
	private final CandidatureRepository candidatureRepository;

    /**
     * Constructeur avec injection du service de stage.
     * @param stageService service pour gérer les stages
     */
    @Autowired
    public StageController(StageService stageService, CandidatureRepository candidatureRepository) {
        this.stageService = stageService;
        this.candidatureRepository = candidatureRepository;
    }

    /**
     * Retourne la liste de tous les stages disponibles.
     * @return liste des stages enregistrés
     */
    @GetMapping
    public List<Stage> getAllStages() {
        return stageService.getAllStages();
    }

    /**
     * Crée un nouveau stage à partir des données envoyées.
     * @param stage stage à enregistrer
     * @return le stage enregistré avec son id
     */
    @PostMapping
    public Stage createStage(@RequestBody Stage stage) {
        return stageService.createStage(stage);
    }
    
    /**
     * Récupère un stage par son ID.
     *
     * @param id L'identifiant du stage à récupérer.
     * @return Le stage correspondant si trouvé, sinon une réponse 404.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Stage> getStageById(@PathVariable Long id) {
        Optional<Stage> stage = stageService.getStageById(id);
        return stage.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    /**
     * ======================================================================
     * PUT /api/stages/{id}
     * Met à jour les informations d'un stage ou alternance existant.
     * ======================================================================
     */
    @PutMapping("/{id}")
    public ResponseEntity<Stage> updateStage(@PathVariable Long id, @RequestBody Stage stageDetails) {
        Optional<Stage> optionalStage = stageService.getStageById(id);
        if (optionalStage.isPresent()) {
            Stage stage = optionalStage.get();
            stage.setTitre(stageDetails.getTitre());
            stage.setDescription(stageDetails.getDescription());
            stage.setDuree(stageDetails.getDuree());
            stage.setType(stageDetails.getType());
            stage.setEntreprise(stageDetails.getEntreprise());
            return ResponseEntity.ok(stageService.createStage(stage));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * ======================================================================
     * DELETE /api/stages/{id}
     * Supprime un stage ou alternance existant par son ID.
     * ======================================================================
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStage(@PathVariable Long id) {
    	Optional<Stage> stageOpt = stageService.getStageById(id);
        if (stageService.existsStage(id)) {
        	Stage stage = stageOpt.get();
        	
        	// Supprimer tous les candidatures associés
            List<Candidature> candidatures = candidatureRepository.findByStageId(stage.getId());
            for (Candidature candidature : candidatures) {
            	candidatureRepository.delete(candidature);
            }
            
            // Maintenant on peut supprimer le stage/alternanace
            stageService.deleteStage(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
