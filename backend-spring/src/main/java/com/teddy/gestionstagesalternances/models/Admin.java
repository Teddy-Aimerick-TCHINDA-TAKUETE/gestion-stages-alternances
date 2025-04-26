package com.teddy.gestionstagesalternances.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Classe représentant un admin dans le système.
 * L'admin est lié à un compte utilisateur.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Identifiant unique
    private String nom; // Nom de l'etudiant
    private String prenom; // Prenom de l'admin
    private String telephone; // Numéro de téléphone
    private String adresse; // Adresse de l'admin

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user; // Lien avec l'entité User (compte de connexion)
}
