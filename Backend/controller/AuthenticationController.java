package com.asia.ecommerce.controller;

import com.asia.ecommerce.entity.UserEntity;
import com.asia.ecommerce.repository.UserRepository;
import com.asia.ecommerce.security.AuthenticationResponse;
import com.asia.ecommerce.services.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private AuthenticationService authenticationService;
    private UserRepository userRepository;

    public AuthenticationController(AuthenticationService authenticationService,
                                    UserRepository userRepository) {
        this.authenticationService = authenticationService;
        this.userRepository = userRepository;
    }

    // api for post request to save the data
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserEntity request) {
        if(userRepository.existsByEmailId(request.getEmailId())) {
            return ResponseEntity.badRequest().body(("Email already exists"));
        }
        return ResponseEntity.ok(authenticationService.registerUser(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody UserEntity request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/validate")
    public ResponseEntity<?> isTokenValid(@RequestParam String token, @RequestBody UserEntity user) {
        return ResponseEntity.ok(authenticationService.validateToken(token, user));
    }
}
