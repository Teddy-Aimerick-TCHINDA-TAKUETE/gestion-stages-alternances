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

import com.teddy.gestionstagesalternances.models.User;
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

    /**
     * Constructeur avec injection du service de user.
     * @param userService service pour gérer les users
     */
	@Autowired // Elle permet à Spring de fournir automatiquement une instance d’un composant à une classe qui en a besoin, sans que tu aies à l’instancier manuellement avec new
    public UserController(UserService userService) {
        this.userService = userService;
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
    
}
