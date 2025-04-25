package com.teddy.gestionstagesalternances.repositories;

import com.teddy.gestionstagesalternances.models.User;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * ====================================================
 * Interface de persistance des utilisateurs.
 * Étend JpaRepository pour accéder aux opérations CRUD + requêtes custom.
 * Spring Boot génère l'implémentation automatiquement.
 * ====================================================
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Recherche un utilisateur par son email.
     * Méthode générée automatiquement grâce à Spring Data JPA.
     * @param email Email de l'utilisateur
     * @return L'utilisateur correspondant (ou null si non trouvé)
     */
    User findByEmail(String email);
}
