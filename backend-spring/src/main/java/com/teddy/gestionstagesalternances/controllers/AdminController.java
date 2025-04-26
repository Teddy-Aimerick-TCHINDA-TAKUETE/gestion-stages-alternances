package com.teddy.gestionstagesalternances.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teddy.gestionstagesalternances.models.Admin;
import com.teddy.gestionstagesalternances.repositories.AdminRepository;

/**
 * Contrôleur REST pour gérer les admins.
 */
@RestController
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    /**
     * Récupère tous les admins enregistrés.
     * @return liste des admins
     */
    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    /**
     * Crée un nouvel admin.
     * @param admin objet à enregistrer
     * @return admin enregistré
     */
    @PostMapping
    public Admin createAdmin(@RequestBody Admin admin) {
        return adminRepository.save(admin);
    }
    
    /**
     * Récupère un admin par son ID.
     *
     * @param id L'identifiant de l'admin.
     * @return L'admin s'il existe, sinon une réponse 404.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
        Optional<Admin> admin = adminRepository.findById(id);
        return admin.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
