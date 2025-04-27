package com.teddy.gestionstagesalternances.models;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Classe représentant un stage dans le système de gestion.
 * Un stage est associé à un étudiant et à une entreprise.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
public class Stage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Identifiant unique du stage
    private String titre; // Titre du stage
    private String description; // Description détaillée du stage
    private String lieu; // Lieu du stage
    private String duree; // Durée du stage (ex: "3 mois")

    // @ManyToOne et @JoinColumn(...) : définissent les relations entre entités (beaucoup de stages peuvent être associés à un même étudiant ou entreprise)
    @ManyToOne
    @JoinColumn(name = "etudiant_id")
    private Etudiant etudiant; // Étudiant ayant postulé à ce stage

    @ManyToOne
    @JoinColumn(name = "entreprise_id")
    private Entreprise entreprise; // Entreprise proposant le stage
    
    @Enumerated(EnumType.STRING)
    private TypeStage type; // Valeur : STAGE ou ALTERNANCE
    
    public enum TypeStage {
        STAGE, ALTERNANCE
    }
}
