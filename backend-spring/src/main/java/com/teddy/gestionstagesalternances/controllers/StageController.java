package com.teddy.gestionstagesalternances.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teddy.gestionstagesalternances.models.Stage;
import com.teddy.gestionstagesalternances.services.StageService;

/**
 * Contrôleur REST pour gérer les offres de stages.
 * Fournit les endpoints pour consulter et créer des stages.
 */
@RestController
@RequestMapping("/api/stages")
public class StageController {

	private final StageService stageService;

    /**
     * Constructeur avec injection du service de stage.
     * @param stageService service pour gérer les stages
     */
    @Autowired
    public StageController(StageService stageService) {
        this.stageService = stageService;
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
}
