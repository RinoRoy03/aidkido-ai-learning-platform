package com.aidkido.controller;

import com.aidkido.dto.LoginRequest;
import com.aidkido.dto.SignupRequest;
import com.aidkido.model.User;
import com.aidkido.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService service;


    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = service.login(request);

        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        return ResponseEntity.ok(user);
    }


    // ================= SIGNUP (NEW) =================
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {

        User user = service.signup(request);

        return ResponseEntity.ok(user);
    }
}
