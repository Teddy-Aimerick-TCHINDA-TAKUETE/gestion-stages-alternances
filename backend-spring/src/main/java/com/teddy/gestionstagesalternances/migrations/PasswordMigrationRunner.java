package com.teddy.gestionstagesalternances.migrations;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.teddy.gestionstagesalternances.models.MigrationFlag;
import com.teddy.gestionstagesalternances.models.User;
import com.teddy.gestionstagesalternances.repositories.MigrationFlagRepository;
import com.teddy.gestionstagesalternances.repositories.UserRepository;

/**
 * Fichier : PasswordMigrationRunner.java
 * Rôle : Script d'exécution unique pour convertir tous les mots de passe
 *        enregistrés en clair en mots de passe chiffrés avec BCrypt.
 * Auteur : Teddy
 * Date : [à compléter]
 */
@Component
public class PasswordMigrationRunner implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private MigrationFlagRepository migrationFlagRepository;

    /**
     * Cette méthode sera exécutée au démarrage de l'application.
     * Elle chiffre tous les mots de passe non encore encodés.
     */
    @Override
    public void run(String... args) {
        // Si la migration est déjà faite, on ne fait rien
        Optional<MigrationFlag> flag = migrationFlagRepository.findById("PASSWORD_MIGRATION");
        if (flag.isPresent() && flag.get().isDone()) {
            System.out.println("🔒 Migration déjà effectuée. Rien à faire.");
            return;
        }

        List<User> users = userRepository.findAll();

        for (User user : users) {
            String currentPassword = user.getPassword();

            if (!currentPassword.startsWith("$2a$") && !currentPassword.startsWith("$2b$")) {
                user.setPassword(passwordEncoder.encode(currentPassword));
                userRepository.save(user);
                System.out.println("🔐 Mot de passe migré : " + user.getEmail());
            }
        }

        // Enregistrer le flag de migration
        migrationFlagRepository.save(new MigrationFlag("PASSWORD_MIGRATION", true));
        System.out.println("✔️ Migration des mots de passe terminée.");
    }
}
