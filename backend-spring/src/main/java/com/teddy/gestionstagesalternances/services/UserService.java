package com.teddy.gestionstagesalternances.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.teddy.gestionstagesalternances.models.User;
import com.teddy.gestionstagesalternances.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAllByOrderByEmailAsc();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
    	user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    
    public Boolean existsUser(Long id) {
        return userRepository.existsById(id);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}

