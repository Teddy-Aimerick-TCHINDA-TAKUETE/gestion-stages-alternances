package com.teddy.gestionstagesalternances.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teddy.gestionstagesalternances.models.Candidature;
import com.teddy.gestionstagesalternances.repositories.CandidatureRepository;

@Service
public class CandidatureService {

    @Autowired
    private CandidatureRepository candidatureRepository;

    public List<Candidature> getAllCandidatures() {
        return candidatureRepository.findAllByOrderByIdAsc();
    }

    public Optional<Candidature> getCandidatureById(Long id) {
        return candidatureRepository.findById(id);
    }

    public Candidature createCandidature(Candidature candidature) {
        return candidatureRepository.save(candidature);
    }
    
    public Boolean existsCandidature(Long id) {
        return candidatureRepository.existsById(id);
    }

    public void deleteCandidature(Long id) {
        candidatureRepository.deleteById(id);
    }
    
    public List<Candidature> getCandidaturesByEtudiant(Long etudiantId) {
        return candidatureRepository.findByEtudiantId(etudiantId);
    }

    public List<Candidature> getCandidaturesByEntreprise(Long entrepriseId) {
        return candidatureRepository.findByStage_Entreprise_Id(entrepriseId);
    }
}
