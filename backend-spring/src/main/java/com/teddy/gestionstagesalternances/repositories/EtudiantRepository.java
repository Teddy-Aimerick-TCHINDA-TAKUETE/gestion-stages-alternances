package com.teddy.gestionstagesalternances.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teddy.gestionstagesalternances.models.Etudiant;

/**
 * Interface de persistance pour les entités Etudiant.
 */
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
	
}
