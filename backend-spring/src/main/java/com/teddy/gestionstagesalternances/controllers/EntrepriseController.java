package com.teddy.gestionstagesalternances.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teddy.gestionstagesalternances.models.Entreprise;
import com.teddy.gestionstagesalternances.models.Stage;
import com.teddy.gestionstagesalternances.repositories.StageRepository;
import com.teddy.gestionstagesalternances.repositories.UserRepository;
import com.teddy.gestionstagesalternances.services.EntrepriseService;

/**
 * ============================================================================
 * Contrôleur REST pour les entreprises.
 * Permet d'exposer des endpoints pour créer et récupérer les entreprises.
 * ============================================================================
 */
@RestController
@RequestMapping("/api/entreprises")
public class EntrepriseController {

	private final EntrepriseService entrepriseService;
	private final StageRepository stageRepository;
	private final StageController stageController;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

    /**
     * Constructeur avec injection du service de entreprise.
     * @param candidatureService service pour gérer les entreprises
     */
    @Autowired
    public EntrepriseController(EntrepriseService entrepriseService, StageRepository stageRepository,
    		StageController stageController,UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.entrepriseService = entrepriseService;
        this.stageRepository = stageRepository;
        this.stageController = stageController;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * GET /api/entreprises
     * Récupère la liste de toutes les entreprises enregistrées.
     * @return liste des entreprises
     */
    @GetMapping
    public List<Entreprise> getAllEntreprises() {
        return entrepriseService.getAllEntreprises();
    }

    /**
     * POST /api/entreprises
     * Crée une nouvelle entreprise à partir des données envoyées en JSON.
     * @param entreprise entreprise à enregistrer
     * @return entreprise enregistrée
     */
    @PostMapping
    public Entreprise createEntreprise(@RequestBody Entreprise entreprise) {
    	entreprise.setUser(userRepository.findByEmail(entreprise.getUser().getEmail()));
        return entrepriseService.createEntreprise(entreprise);
    }
    
    /**
     * Récupère une entreprise par son ID.
     *
     * @param id L'identifiant de l'entreprise.
     * @return L'entreprise si elle est trouvée, ou une erreur 404.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Entreprise> getEntrepriseById(@PathVariable Long id) {
        Optional<Entreprise> entreprise = entrepriseService.getEntrepriseById(id);
        return entreprise.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    /**
     * ======================================================================
     * PUT /api/entreprises/{id}
     * Met à jour les informations d'une entreprise existante.
     * ======================================================================
     */
    @PutMapping("/{id}")
    public ResponseEntity<Entreprise> updateEntreprise(@PathVariable Long id, @RequestBody Entreprise entrepriseDetails) {
        Optional<Entreprise> optionalEntreprise = entrepriseService.getEntrepriseById(id);
        if (optionalEntreprise.isPresent()) {
            Entreprise entreprise = optionalEntreprise.get();
            entreprise.setNom(entrepriseDetails.getNom());
            entreprise.setTelephone(entrepriseDetails.getTelephone());
            entreprise.setAdresse(entrepriseDetails.getAdresse());
            entreprise.setSiteWeb(entrepriseDetails.getSiteWeb());
            entreprise.setSecteurActivite(entrepriseDetails.getSecteurActivite());
            entrepriseDetails.getUser().setPassword(passwordEncoder.encode(entrepriseDetails.getUser().getPassword()));
            entreprise.setUser(entrepriseDetails.getUser());
            return ResponseEntity.ok(entrepriseService.createEntreprise(entreprise));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * ======================================================================
     * DELETE /api/entreprises/{id}
     * Supprime une entreprise existante par son ID.
     * ======================================================================
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntreprise(@PathVariable Long id) {
    	Optional<Entreprise> entrepriseOpt = entrepriseService.getEntrepriseById(id);
        if (entrepriseService.existsEntreprise(id)) {
        	Entreprise entreprise = entrepriseOpt.get();
            
            // Supprimer tous les stages associés
            List<Stage> stages = stageRepository.findByEntrepriseId(entreprise.getId());
            for (Stage stage : stages) {
            	stageController.deleteStage(stage.getId());
            }
            
            // Maintenant on peut supprimer l'entreprise
            entrepriseService.deleteEntreprise(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
