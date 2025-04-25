package com.teddy.gestionstagesalternances;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Classe principale de l'application Spring Boot "gestionstagesalternances".
 *
 * Cette classe contient la méthode main qui sert de point d'entrée pour exécuter l'application.
 * Elle utilise l'annotation @SpringBootApplication pour activer :
 * - La configuration automatique de Spring (auto-configuration)
 * - Le scan des composants (controllers, services, repositories, etc.)
 * - La configuration par défaut de Spring Boot
 *
 * Lorsque cette classe est exécutée, elle démarre l'application avec un serveur embarqué (Tomcat).
 */
@SpringBootApplication // Indique à Spring Boot qu'il s'agit de la classe principale (active la configuration auto + scan)
public class GestionstagesalternancesApplication {

    /**
     * Point d'entrée de l'application Spring Boot.
     * Cette méthode est automatiquement appelée au lancement du projet.
     *
     * @param args Arguments passés en ligne de commande (optionnels)
     */
    public static void main(String[] args) {
        // Lance l'application Spring Boot en initialisant le contexte et le serveur embarqué
        SpringApplication.run(GestionstagesalternancesApplication.class, args);
    }
}