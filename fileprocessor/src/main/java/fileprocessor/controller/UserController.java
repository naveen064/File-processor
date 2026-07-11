package fileprocessor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import fileprocessor.entity.User;
import fileprocessor.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
public User login(@RequestBody User loginUser) {

    System.out.println("Username: " + loginUser.getUsername());
    System.out.println("Password: " + loginUser.getPassword());

    return userRepository
            .findByUsernameAndPassword(
                    loginUser.getUsername(),
                    loginUser.getPassword())
            .orElseThrow(() ->
                    new RuntimeException("Invalid Username or Password"));
}
}