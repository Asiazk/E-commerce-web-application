package com.asia.ecommerce.services;

import com.asia.ecommerce.entity.UserEntity;
import com.asia.ecommerce.repository.AdminRepository;
import com.asia.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


// we create instance of userDetailsService and utilize loadUser in order to communicate with DB
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;
    private AdminRepository adminRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository, AdminRepository adminRepository) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
    }

    // the username of regular user is the email because it's unique
    // if regular user is not found - it's admin, validate the details
    @Override
    public UserDetails loadUserByUsername(String str) throws UsernameNotFoundException {
        Optional<UserEntity> user = userRepository.findByEmailId(str);
        if(user.isEmpty()) {
            return adminRepository.findByName(str).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        }
        return userRepository.findByEmailId(str).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
