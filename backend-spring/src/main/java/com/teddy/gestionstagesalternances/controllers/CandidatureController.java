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
import com.teddy.gestionstagesalternances.repositories.CandidatureRepository;

/**
 * Contrôleur REST pour gérer les candidatures des étudiants.
 */
@RestController
@RequestMapping("/api/candidatures")
public class CandidatureController {

    @Autowired
    private CandidatureRepository candidatureRepository;

    /**
     * Récupère toutes les candidatures enregistrées.
     * @return liste des candidatures
     */
    @GetMapping
    public List<Candidature> getAllCandidatures() {
        return candidatureRepository.findAll();
    }

    /**
     * Crée une nouvelle candidature.
     * @param candidature données à enregistrer
     * @return candidature enregistrée
     */
    @PostMapping
    public Candidature postuler(@RequestBody Candidature candidature) {
        candidature.setDateCandidature(LocalDate.now());
        candidature.setStatut(Candidature.Statut.EN_ATTENTE);
        return candidatureRepository.save(candidature);
    }
    
    /**
     * Récupère une candidature par son ID.
     *
     * @param id L'identifiant de la candidature.
     * @return La candidature si trouvée, sinon une réponse 404.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Candidature> getCandidatureById(@PathVariable Long id) {
        Optional<Candidature> candidature = candidatureRepository.findById(id);
        return candidature.map(ResponseEntity::ok)
                          .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
