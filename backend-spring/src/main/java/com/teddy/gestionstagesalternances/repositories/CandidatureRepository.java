package com.teddy.gestionstagesalternances.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teddy.gestionstagesalternances.models.Candidature;

/**
 * Interface pour accéder aux candidatures en base.
 */
public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
}
