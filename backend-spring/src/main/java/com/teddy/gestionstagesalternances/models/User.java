package com.teddy.gestionstagesalternances.models;


import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * ====================================================
 * Classe représentant un utilisateur de la plateforme.
 * Un utilisateur peut être un étudiant, une entreprise ou un admin.
 * Cette classe est mappée sur une table en base de données.
 * ====================================================
 */
@Entity // Signale que cette classe est une entité JPA
@Table(name = "utilisateur") // Signale que la classe correspond a la table utilisateur dans la BD
@Data   // Lombok : génère les getters/setters automatiquement
@EqualsAndHashCode(of = "id") // Lombok : égalité basée uniquement sur l'ID
@NoArgsConstructor // Lombok : constructeur sans arguments
@AllArgsConstructor // Lombok : constructeur avec tous les champs
@Builder // Lombok : permet de construire un objet via User.builder().nom(...).email(...).build()
public class User {

    @Id // Clé primaire de l'entité
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incrémentation par la BDD
    private Long id;

    private String email; // Email (sera utilisé pour l'authentification)
    private String password; // Mot de passe (crypté plus tard avec BCrypt)

    @Enumerated(EnumType.STRING) // Enregistre l'enum sous forme de texte (et non entier)
    private Role role; // Rôle de l'utilisateur : étudiant, entreprise ou admin

    /**
     * Enum interne définissant les rôles possibles.
     */
    public enum Role {
        ETUDIANT, ENTREPRISE, ADMIN, SUPER_ADMIN
    }
}
