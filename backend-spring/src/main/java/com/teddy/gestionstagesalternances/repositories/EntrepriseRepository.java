package com.teddy.gestionstagesalternances.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teddy.gestionstagesalternances.models.Entreprise;

/**
 * ============================================================================
 * Interface de persistance pour les entreprises.
 * Permet d'effectuer toutes les opérations CRUD sans implémentation manuelle.
 * ============================================================================
 */
public interface EntrepriseRepository extends JpaRepository<Entreprise, Long> {
	
	List<Entreprise> findAllByOrderByNomAsc();

	Optional<Entreprise> findByUserId(Long id);

}
