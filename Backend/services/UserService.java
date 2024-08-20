package com.asia.ecommerce.services;

import com.asia.ecommerce.entity.UserEntity;
import com.asia.ecommerce.model.User;
import com.asia.ecommerce.model.Role;
import com.asia.ecommerce.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean checkCurrEmail(String currEmail) {
        Optional<UserEntity> queryResult = userRepository.findByEmailId(currEmail);
        return (queryResult.isEmpty());
    }

    public void assignRole(Role role, UserEntity user) {
        user.setRole(Role.USER);
    }

    public User getUser(long id) {
        UserEntity userEntity = userRepository.findById(id).get();
        User user = new User();
        BeanUtils.copyProperties(userEntity,user);

        return user;
    }

    public void updateUser(long id, User newUser) {
        UserEntity user = userRepository.findById(id).orElseThrow();
        BeanUtils.copyProperties(newUser, user);
        userRepository.save(user);
        System.out.println(userRepository.findById(id).get());
    }
}
