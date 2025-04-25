package com.teddy.gestionstagesalternances.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teddy.gestionstagesalternances.models.Stage;

/**
 * Interface de persistance pour l'entité Stage.
 * Étend JpaRepository pour bénéficier de toutes les opérations CRUD.
 */
public interface StageRepository extends JpaRepository<Stage, Long> {
    // Ici, on pourra ajouter des méthodes de recherche personnalisées plus tard.
}
