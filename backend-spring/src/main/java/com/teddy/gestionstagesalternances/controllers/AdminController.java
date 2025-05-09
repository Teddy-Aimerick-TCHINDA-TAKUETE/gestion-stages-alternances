package com.teddy.gestionstagesalternances.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teddy.gestionstagesalternances.models.Admin;
import com.teddy.gestionstagesalternances.repositories.UserRepository;
import com.teddy.gestionstagesalternances.services.AdminService;

/**
 * Contrôleur REST pour gérer les admins.
 */
@RestController
@RequestMapping("/api/admins")
public class AdminController {

    private final AdminService adminService;
    private final UserRepository userRepository;
    /**
     * Constructeur avec injection de dépendance.
     * @param adminService service gérant les opérations sur les admins
     */
    @Autowired
    public AdminController(AdminService adminService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.adminService = adminService;
        this.userRepository = userRepository;
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
    	admin.setUser(userRepository.findByEmail(admin.getUser().getEmail()));
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
    
    /**
     * ======================================================================
     * PUT /api/admins/{id}
     * Met à jour les informations d'un admin existant.
     * ======================================================================
     */
    @PutMapping("/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable Long id, @RequestBody Admin adminDetails) {
        Optional<Admin> optionalAdmin = adminService.getAdminById(id);
        if (optionalAdmin.isPresent()) {
            Admin admin = optionalAdmin.get();
            admin.setNom(adminDetails.getNom());
            admin.setPrenom(adminDetails.getPrenom());
            admin.setTelephone(adminDetails.getTelephone());
            admin.setAdresse(adminDetails.getAdresse());
            //adminDetails.getUser().setPassword(passwordEncoder.encode(adminDetails.getUser().getPassword()));
            admin.setUser(adminDetails.getUser());
            return ResponseEntity.ok(adminService.createAdmin(admin));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * ======================================================================
     * DELETE /api/admins/{id}
     * Supprime un admin existant par son ID.
     * ======================================================================
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
        if (adminService.existsAdmin(id)) {
            adminService.deleteAdmin(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}

