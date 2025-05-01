package com.teddy.gestionstagesalternances.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teddy.gestionstagesalternances.models.MigrationFlag;

@Repository
public interface MigrationFlagRepository extends JpaRepository<MigrationFlag, String> {}
