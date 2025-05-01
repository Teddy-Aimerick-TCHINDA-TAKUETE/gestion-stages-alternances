package com.teddy.gestionstagesalternances.models;

import java.time.LocalDate;

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
 * Représente une candidature d’un étudiant à un stage.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
public class Candidature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Identifiant unique de la candidature
    private LocalDate dateCandidature; // Date à laquelle l'étudiant a postulé
    private LocalDate dateDisponibilite; // Date a partir de laquelle l'étudiant est disponible
    private String message; // Message facultatif de l’étudiant
    private String cvFilename; // cv de l'étudiant qui postule
    private String lettreMotivationFilename; // Lettre de motivation de l'étudiant

    @Enumerated(EnumType.STRING)
    private Statut statut; // Statut de la candidature (EN_ATTENTE, ACCEPTEE, REFUSEE)

    @ManyToOne
    @JoinColumn(name = "etudiant_id")
    private Etudiant etudiant; // Étudiant qui postule

    @ManyToOne
    @JoinColumn(name = "stage_id")
    private Stage stage; // Stage auquel l'étudiant postule

    public enum Statut {
        EN_ATTENTE, ACCEPTEE, REFUSEE
    }
}
