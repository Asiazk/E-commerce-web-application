package com.asia.ecommerce.controller;

import com.asia.ecommerce.entity.AdminEntity;
import com.asia.ecommerce.entity.UserEntity;
import com.asia.ecommerce.repository.AdminRepository;
import com.asia.ecommerce.security.AdminAuthResponse;
import com.asia.ecommerce.security.AuthenticationResponse;
import com.asia.ecommerce.services.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {
    private AuthenticationService authenticationService;
    private AdminRepository adminRepository;

    public AdminController(AuthenticationService authenticationService, AdminRepository adminRepository) {
        this.authenticationService = authenticationService;
        this.adminRepository = adminRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AdminEntity request) {
        if(adminRepository.existsByName(request.getName())) {
            return ResponseEntity.badRequest().body(("Admin name already exists"));
        }
        return ResponseEntity.ok(authenticationService.registerAdmin(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AdminAuthResponse> login(@RequestBody AdminEntity request) {
        System.out.println(request);
        AdminEntity admin = adminRepository.findByName(request.getName()).orElseThrow();
        System.out.println(admin);
        AdminAuthResponse res = authenticationService.authenticateAdmin(request);
        return  ResponseEntity.ok(res);
    }

    @PostMapping("/validate")
    public ResponseEntity<?> isTokenValid(@RequestParam String token, @RequestBody AdminEntity admin) {
        return ResponseEntity.ok(authenticationService.validateAdminToken(token, admin));
    }
}
