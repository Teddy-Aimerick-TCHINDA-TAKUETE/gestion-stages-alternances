package com.teddy.gestionstagesalternances.controllers;

import java.time.LocalDate;
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

import com.teddy.gestionstagesalternances.models.Candidature;
import com.teddy.gestionstagesalternances.services.CandidatureService;

/**
 * Contrôleur REST pour gérer les candidatures des étudiants.
 */
@RestController
@RequestMapping("/api/candidatures")
public class CandidatureController {

    private final CandidatureService candidatureService;

    /**
     * Constructeur avec injection du service de candidature.
     * @param candidatureService service pour gérer les candidatures
     */
    @Autowired
    public CandidatureController(CandidatureService candidatureService) {
        this.candidatureService = candidatureService;
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
}
