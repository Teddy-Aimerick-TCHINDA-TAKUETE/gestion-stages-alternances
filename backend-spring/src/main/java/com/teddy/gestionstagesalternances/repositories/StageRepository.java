package com.teddy.gestionstagesalternances.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teddy.gestionstagesalternances.models.Stage;

/**
 * Interface de persistance pour l'entité Stage.
 * Étend JpaRepository pour bénéficier de toutes les opérations CRUD.
 */
public interface StageRepository extends JpaRepository<Stage, Long> {
	
	List<Stage> findAllByOrderByTitreAsc();

	List<Stage> findByEntrepriseId(Long id);
    
}
