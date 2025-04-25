package com.teddy.gestionstagesalternances.db;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import com.teddy.gestionstagesalternances.GestionstagesalternancesApplication;

@SpringBootTest( classes = { GestionstagesalternancesApplication.class } )//  Lance un contexte Spring
@TestMethodOrder(MethodOrderer.MethodName.class) // Exécution par ordre des méthodes
public class InitDBTest {

    @Test
    @Sql(scripts = {"/db/1-schema.sql"})// Exécute les scripts SQL à chaque méthode
    void db_1_createSchema() {
        // Exécute la création du schema
    }
    
    @Test
    @Sql(scripts = {"/db/2-delete.sql"})
    void db_2_deleteTables() {
        // Supprime toutes les données
    }

    @Test
    @Sql(scripts = {"/db/3-table.sql"})
    void db_3_createTables() {
        // Exécute les créations de tables
    }

    @Test
    @Sql(scripts = {"/db/4-data.sql"})
    void db_4_insertData() {
        // Exécute les insertions
    }
}
