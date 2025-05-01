package com.teddy.gestionstagesalternances.dto;

import lombok.Data;

/**
 * Fichier : PasswordUpdateRequest.java
 * Rôle : DTO permettant de transmettre une demande de modification de mot de passe
 * Auteur : Teddy
 * Date : [à compléter]
 */
@Data
public class PasswordUpdateRequest {
    private String oldPassword;
    private String newPassword;
}
