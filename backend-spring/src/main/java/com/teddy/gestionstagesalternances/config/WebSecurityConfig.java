package com.teddy.gestionstagesalternances.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Classe de configuration Spring pour la sécurité.
 * Elle déclare les beans nécessaires, notamment l'encodeur de mots de passe.
 */
@Configuration
public class WebSecurityConfig {

    /**
     * Bean de type PasswordEncoder basé sur l'algorithme BCrypt.
     * Utilisé pour hacher les mots de passe lors de leur enregistrement
     * et pour les comparer de manière sécurisée à la connexion.
     *
     * @return une instance de BCryptPasswordEncoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
