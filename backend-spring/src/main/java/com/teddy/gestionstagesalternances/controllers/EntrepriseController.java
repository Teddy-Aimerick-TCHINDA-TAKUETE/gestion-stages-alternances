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

import com.teddy.gestionstagesalternances.models.Entreprise;
import com.teddy.gestionstagesalternances.repositories.EntrepriseRepository;

/**
 * ============================================================================
 * Contrôleur REST pour les entreprises.
 * Permet d'exposer des endpoints pour créer et récupérer les entreprises.
 * ============================================================================
 */
@RestController
@RequestMapping("/api/entreprises")
public class EntrepriseController {

    @Autowired
    private EntrepriseRepository entrepriseRepository;

    /**
     * GET /api/entreprises
     * Récupère la liste de toutes les entreprises enregistrées.
     * @return liste des entreprises
     */
    @GetMapping
    public List<Entreprise> getAllEntreprises() {
        return entrepriseRepository.findAll();
    }

    /**
     * POST /api/entreprises
     * Crée une nouvelle entreprise à partir des données envoyées en JSON.
     * @param entreprise entreprise à enregistrer
     * @return entreprise enregistrée
     */
    @PostMapping
    public Entreprise createEntreprise(@RequestBody Entreprise entreprise) {
        return entrepriseRepository.save(entreprise);
    }
    
    /**
     * Récupère une entreprise par son ID.
     *
     * @param id L'identifiant de l'entreprise.
     * @return L'entreprise si elle est trouvée, ou une erreur 404.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Entreprise> getEntrepriseById(@PathVariable Long id) {
        Optional<Entreprise> entreprise = entrepriseRepository.findById(id);
        return entreprise.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
