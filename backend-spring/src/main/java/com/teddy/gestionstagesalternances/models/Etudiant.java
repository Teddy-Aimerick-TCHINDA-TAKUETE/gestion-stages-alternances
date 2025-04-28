package com.teddy.gestionstagesalternances.models;

import jakarta.persistence.CascadeType;
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
 * Classe représentant un étudiant dans le système.
 * L'étudiant est lié à un compte utilisateur.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
public class Etudiant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Identifiant unique
    private String nom; // Nom de l'etudiant
    private String prenom; // Prenom de l'etudiant
    private String telephone; // Numéro de téléphone
    private String adresse; // Adresse de l'etudiant
    private String niveauEtude; // Niveau d'études (Licence, Master...)
    private String specialite; // Spécialité ou filière de l'étudiant
    private String cv; // Chemin du fichier CV (facultatif pour l'instant)

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id")
    private User user; // Lien avec l'entité User (compte de connexion)
}
