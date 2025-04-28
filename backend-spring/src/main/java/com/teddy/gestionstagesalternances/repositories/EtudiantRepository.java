package com.teddy.gestionstagesalternances.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teddy.gestionstagesalternances.models.Etudiant;

/**
 * Interface de persistance pour les entités Etudiant.
 */
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
	
	List<Etudiant> findAllByOrderByNomAsc();

	Optional<Etudiant> findByUserId(Long id);
	
}
