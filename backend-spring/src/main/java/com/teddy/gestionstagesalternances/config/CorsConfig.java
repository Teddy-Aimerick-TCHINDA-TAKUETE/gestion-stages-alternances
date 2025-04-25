package com.teddy.gestionstagesalternances.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * ╔═══════════════════════════════════════════════════════════════════════╗
 * ║                      Classe de Configuration CORS                    ║
 * ╠═══════════════════════════════════════════════════════════════════════╣
 * ║ Nom de la classe : CorsConfig                                        ║
 * ║ Rôle            : Autorise le frontend Angular (port 4200)           ║
 * ║                   à faire des requêtes vers le backend (port 8080)   ║
 * ║ Auteur          : Teddy (généré avec ChatGPT)                        ║
 * ║ Date            : Avril 2025                                         ║
 * ║ Framework       : Spring Boot                                        ║
 * ╚═══════════════════════════════════════════════════════════════════════╝
 */

@Configuration // Indique que cette classe contient une configuration Spring
public class CorsConfig {

    /**
     * Méthode de configuration CORS globale.
     * Elle permet d'autoriser les appels HTTP provenant du frontend Angular
     * (généralement sur http://localhost:4200) vers le backend Spring Boot.
     *
     * @return WebMvcConfigurer pour appliquer les règles CORS
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            // Surcharge de la méthode pour définir les règles CORS
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")              // Autorise toutes les routes commençant par /api/
                        .allowedOrigins("http://localhost:4200") // Autorise uniquement le frontend Angular
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Méthodes HTTP acceptées
                        .allowedHeaders("*");                // Autorise tous les headers (comme Content-Type, etc.)
            }
        };
    }
}
