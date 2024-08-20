package com.asia.ecommerce.services;

import com.asia.ecommerce.entity.AdminEntity;
import com.asia.ecommerce.entity.UserEntity;
import com.asia.ecommerce.model.Role;
import com.asia.ecommerce.repository.AdminRepository;
import com.asia.ecommerce.repository.UserRepository;
import com.asia.ecommerce.security.AdminAuthResponse;
import com.asia.ecommerce.security.AuthenticationResponse;
import com.asia.ecommerce.security.JwtService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtService jwtService;
    private AuthenticationManager authenticationManager; // AuthenticationManager checks if all user details match
    private AdminRepository adminRepository;

    public AuthenticationService(UserRepository userRepository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 AuthenticationManager authenticationManager,
                                 AdminRepository adminRepository
                                 ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.adminRepository = adminRepository;
    }

    // for signing up the user. checking if the email is unique in controller
    public ResponseEntity<String> registerUser(UserEntity request) {
        UserEntity user = new UserEntity();
        BeanUtils.copyProperties(request, user);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER); // user is default
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    // used for first admin creation
    // no ui for registerAdmin, can be done with Postman
    public ResponseEntity<String> registerAdmin(AdminEntity request) {
        AdminEntity admin = new AdminEntity();
        BeanUtils.copyProperties(request, admin);
        admin.setPassword(passwordEncoder.encode(request.getPassword()));
        admin.setRole(Role.ADMIN);
        adminRepository.save(admin);
        return ResponseEntity.ok("Admin registered!");
    }

    // for login the user
    public AuthenticationResponse authenticate(UserEntity request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmailId(),
                        request.getPassword()
                )
        );

        UserEntity user = userRepository.findByEmailId(request.getEmailId()).orElseThrow();
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(
                token,
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmailId(),
                user.getRole(),
                user.getPhone(),
                user.getCity(),
                user.getStreet());
    }

    public boolean validateToken(String token, UserDetails user) {
        return jwtService.validateToken(token, user);
    }

    public boolean validateAdminToken(String token, UserDetails admin) {
        return jwtService.validateAdminToken(token, admin);
    }

    public AdminAuthResponse authenticateAdmin(AdminEntity request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getName(),
                        request.getPassword()
                )
        );

        AdminEntity admin = adminRepository.findByName(request.getName()).orElseThrow();
        String token = jwtService.generateAdminToken(admin);

        return new AdminAuthResponse(
                token,
                admin.getId(),
                admin.getName(),
                admin.getRole()
                );
    }

    public String getUserNameFromToken(String token) {
        return jwtService.extractUserName(token);
    }

}
