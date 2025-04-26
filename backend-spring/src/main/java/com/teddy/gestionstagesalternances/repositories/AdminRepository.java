package com.teddy.gestionstagesalternances.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teddy.gestionstagesalternances.models.Admin;

/**
 * Interface de persistance pour les entités Admin.
 */
public interface AdminRepository extends JpaRepository<Admin, Long> {
	
}
