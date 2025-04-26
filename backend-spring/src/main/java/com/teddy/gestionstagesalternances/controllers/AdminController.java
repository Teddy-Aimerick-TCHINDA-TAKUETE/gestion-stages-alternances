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
import com.teddy.gestionstagesalternances.services.AdminService;

/**
 * Contrôleur REST pour gérer les admins.
 */
@RestController
@RequestMapping("/api/admins")
public class AdminController {

    private final AdminService adminService;

    /**
     * Constructeur avec injection de dépendance.
     * @param adminService service gérant les opérations sur les admins
     */
    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    /**
     * Récupère la liste de tous les administrateurs.
     * @return liste des admins
     */
    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    /**
     * Crée un nouvel administrateur.
     * @param admin L'administrateur à créer
     * @return l'administrateur créé
     */
    @PostMapping
    public Admin createAdmin(@RequestBody Admin admin) {
        return adminService.createAdmin(admin);
    }

    /**
     * Récupère un administrateur par son identifiant.
     * @param id identifiant de l'administrateur
     * @return administrateur trouvé ou 404 sinon
     */
    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
    	Optional<Admin> admin = adminService.getAdminById(id);
        return admin.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

