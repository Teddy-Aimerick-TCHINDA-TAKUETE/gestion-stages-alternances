package com.teddy.gestionstagesalternances.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teddy.gestionstagesalternances.models.Candidature;

/**
 * Interface pour accéder aux candidatures en base.
 */
public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
	
	List<Candidature> findAllByOrderByIdAsc();

	List<Candidature> findByEtudiantId(Long id);

	List<Candidature> findByStageId(Long id);
	
}
