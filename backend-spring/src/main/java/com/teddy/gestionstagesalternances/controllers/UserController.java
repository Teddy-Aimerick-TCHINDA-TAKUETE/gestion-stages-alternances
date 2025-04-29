package com.teddy.gestionstagesalternances.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teddy.gestionstagesalternances.models.Admin;
import com.teddy.gestionstagesalternances.models.Entreprise;
import com.teddy.gestionstagesalternances.models.Etudiant;
import com.teddy.gestionstagesalternances.models.User;
import com.teddy.gestionstagesalternances.repositories.AdminRepository;
import com.teddy.gestionstagesalternances.repositories.EntrepriseRepository;
import com.teddy.gestionstagesalternances.repositories.EtudiantRepository;
import com.teddy.gestionstagesalternances.repositories.UserRepository;
import com.teddy.gestionstagesalternances.services.UserService;

/**
 * ====================================================
 * Contrôleur REST de test pour l'API utilisateur.
 * Pour l'instant, il expose juste un endpoint de test.
 * ====================================================
 */
@RestController // Signale que cette classe expose une API REST (JSON)
@RequestMapping("/api/users") // Préfixe commun à toutes les routes de ce contrôleur
public class UserController {
	
	// @Autowired	Injecte automatiquement une instance de la classe (ici le Service)
	private final UserService userService;
	private final UserRepository userRepository;
	private final AdminRepository adminRepository;
	private final EtudiantRepository etudiantRepository;
	private final EntrepriseRepository entrepriseRepository;

	/**
     * Constructeur avec injection du service de user.
     * @param userService service pour gérer les users
     */
	@Autowired // Elle permet à Spring de fournir automatiquement une instance d’un composant à une classe qui en a besoin, sans que tu aies à l’instancier manuellement avec new
	public UserController(UserService userService, UserRepository userRepository, AdminRepository adminRepository,
			EtudiantRepository etudiantRepository, EntrepriseRepository entrepriseRepository) {
		super();
		this.userService = userService;
		this.userRepository = userRepository;
		this.adminRepository = adminRepository;
		this.etudiantRepository = etudiantRepository;
		this.entrepriseRepository = entrepriseRepository;
	}
	// @Autowired	Injecte automatiquement une instance de la classe (ici le Service)

    /**
     * Endpoint de test simple pour valider que l'API répond.
     * Accessible à l'URL : GET http://localhost:8080/api/hello
     * @return Message de bienvenue
     */
    @GetMapping("/hello")
    public String hello() {
        return "Bienvenue sur l'API de gestion des stages et alternances 🚀";
    }
    
    /**
     * Récupère tous les utilisateurs présents en base.
     * Accessible via : GET http://localhost:8080/api/users
     * @return Liste des utilisateurs
     */
    @GetMapping // Associe cette méthode au endpoint GET /api/users
    public List<User> getAllUsers() {
        return userService.getAllUsers(); // SELECT * FROM user
    }
    
    /**
     * Méthode POST
     * Permet de créer un nouvel utilisateur à partir des données envoyées en JSON.
     * @param user L'utilisateur à enregistrer (fourni dans le corps de la requête)
     * @return l'utilisateur enregistré
     */
    @PostMapping // Associe cette méthode au endpoint POST /api/users
    public User createUser(@RequestBody User user) {
        // Le @RequestBody indique que l'objet User est passé dans le corps de la requête HTTP
        return userService.createUser(user);  // Enregistre l'utilisateur dans la base de données
    }
    
    /**
     * Récupère un utilisateur par son ID.
     *
     * @param id L'identifiant de l'user.
     * @return L'user si trouvé, sinon 404.
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) { 
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }
    // @PathVariable	Permet d’extraire la variable {id} depuis l’URL de la requête
    // ResponseEntity	Objet qui permet de renvoyer une réponse HTTP complète (avec code + corps)
    
    /**
     * ======================================================================
     * PUT /api/users/{id}
     * Met à jour les informations d'un utilisateur existant.
     * ======================================================================
     */
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        Optional<User> optionalUser = userService.getUserById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setEmail(userDetails.getEmail());
            user.setPassword(userDetails.getPassword());
            user.setRole(userDetails.getRole());
            return ResponseEntity.ok(userService.createUser(user));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * ======================================================================
     * DELETE /api/users/{id}
     * Supprime un utilisateur existant par son ID.
     * ======================================================================
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    	Optional<User> optionalUser = userRepository.findById(id);
        if (userService.existsUser(id)) {
        	User user = optionalUser.get();

            // Vérifier s'il est Admin
            Optional<Admin> admin = adminRepository.findByUserId(user.getId());
            admin.ifPresent(adminRepository::delete);

            // Vérifier s'il est Etudiant
            Optional<Etudiant> etudiant = etudiantRepository.findByUserId(user.getId());
            etudiant.ifPresent(etudiantRepository::delete);

            // Vérifier s'il est Entreprise
            Optional<Entreprise> entreprise = entrepriseRepository.findByUserId(user.getId());
            entreprise.ifPresent(entrepriseRepository::delete);

            // Finalement supprimer le User
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * POST /api/users/login
     * Permet à un utilisateur de se connecter avec son email et mot de passe.
     *
     * @param loginRequest Objet contenant email et motDePasse.
     * @return L'utilisateur s'il existe, sinon une réponse d'erreur 401.
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByEmailAndPassword(
            loginRequest.getEmail(), 
            loginRequest.getPassword()
        );

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body("Identifiants invalides.");
        }
    }

    /**
     * Classe interne pour représenter la requête de login.
     */
    public static class LoginRequest {
        private String email;
        private String password;

        // Getters et Setters
        public String getEmail() {
            return email;
        }
		public void setEmail(String email) {
            this.email = email;
        }
        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
    }
    
}
