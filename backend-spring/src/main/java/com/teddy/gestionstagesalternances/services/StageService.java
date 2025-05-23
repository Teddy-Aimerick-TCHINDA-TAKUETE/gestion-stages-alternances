package com.teddy.gestionstagesalternances.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teddy.gestionstagesalternances.models.Stage;
import com.teddy.gestionstagesalternances.repositories.StageRepository;

@Service
public class StageService {

    @Autowired
    private StageRepository stageRepository;

    public List<Stage> getAllStages() {
        return stageRepository.findAllByOrderByTitreAsc();
    }

    public Optional<Stage> getStageById(Long id) {
        return stageRepository.findById(id);
    }

    public Stage createStage(Stage stage) {
        return stageRepository.save(stage);
    }
    
    public Boolean existsStage(Long id) {
        return stageRepository.existsById(id);
    }

    public void deleteStage(Long id) {
        stageRepository.deleteById(id);
    }
    
    public List<Stage> getStagesByEntreprise(Long entrepriseId) {
        return stageRepository.findByEntrepriseId(entrepriseId);
    }

}

