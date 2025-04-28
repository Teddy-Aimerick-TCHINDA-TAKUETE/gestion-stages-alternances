package com.teddy.gestionstagesalternances.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.teddy.gestionstagesalternances.models.Admin;

/**
 * Interface de persistance pour les entités Admin.
 */
public interface AdminRepository extends JpaRepository<Admin, Long> {
	
	List<Admin> findAllByOrderByNomAsc();

	Optional<Admin> findByUserId(Long id);
	
}
