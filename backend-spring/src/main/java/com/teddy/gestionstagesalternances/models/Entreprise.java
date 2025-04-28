package com.teddy.gestionstagesalternances.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * ============================================================================
 * Entité représentant une entreprise dans la plateforme.
 * Une entreprise peut proposer des stages ou alternances, et contient des infos
 * de contact et d’identification.
 * ============================================================================
 */
@Entity
@Table(name = "entreprise") // Nom explicite pour éviter les conflits SQL
@Data // Lombok : génère automatiquement getters, setters, toString, etc.
@NoArgsConstructor // Lombok : constructeur vide
@AllArgsConstructor // Lombok : constructeur complet
@Builder // Lombok : support du pattern builder
@EqualsAndHashCode(of = "id")
public class Entreprise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Identifiant unique de l'entreprise

    private String nom; // Nom de l'entreprise
    private String telephone; // Numéro de téléphone
    private String adresse; // Adresse postale
    private String siteWeb; // Site internet de l'entreprise (facultatif)
    private String secteurActivite; // Domaine d'activité : IT, banque, santé...
    
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id")
    private User user; // Lien avec l'entité User (compte de connexion)
}
