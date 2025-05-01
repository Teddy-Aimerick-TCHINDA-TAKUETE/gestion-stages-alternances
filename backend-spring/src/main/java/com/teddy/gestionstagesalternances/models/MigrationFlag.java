package com.teddy.gestionstagesalternances.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Entité utilisée pour marquer les migrations systèmes exécutées.
 * Chaque ligne identifie une tâche de migration avec un identifiant unique (ex : PASSWORD_MIGRATION).
 */
@Entity
@Data
@Builder
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@AllArgsConstructor
public class MigrationFlag {

    /**
     * Identifiant de la migration (ex : PASSWORD_MIGRATION)
     */
    @Id
    private String id;

    /**
     * Statut de la migration (true = déjà effectuée, false = à faire)
     */
    private boolean done;
}
