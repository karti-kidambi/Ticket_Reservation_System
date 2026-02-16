package com.example.ticketbook.controller;

import com.example.ticketbook.entity.User;
import com.example.ticketbook.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.registerUser(user));
        } catch (RuntimeException ex) {
            String message = ex.getMessage() == null ? "Registration failed" : ex.getMessage();
            if ("Email already registered".equalsIgnoreCase(message)) {
                return ResponseEntity.status(409).body(Map.of("message", message));
            }
            return ResponseEntity.badRequest().body(Map.of("message", message));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginRequest) {
        Optional<User> user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }
}
