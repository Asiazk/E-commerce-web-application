package com.asia.ecommerce.controller;
// here we catch the requests from FE and return responses
// GET: retrieve data without side effect
// POST: actions that change server state such as creating or updating resources
import com.asia.ecommerce.entity.UserEntity;
import com.asia.ecommerce.model.User;
import com.asia.ecommerce.repository.UserRepository;
import com.asia.ecommerce.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")// allow communication between UI application and spring
@RestController
@RequestMapping("/api/v1/")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<UserEntity> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable long id) {
        return ResponseEntity.ok(userService.getUser(id));
    }

    @PutMapping("/users/update/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User newUser, @PathVariable long id) {
        userService.updateUser(id, newUser);
        return ResponseEntity.ok(newUser);
    }

}
