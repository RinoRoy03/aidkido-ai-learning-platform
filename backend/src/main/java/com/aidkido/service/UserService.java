package com.aidkido.service;

import com.aidkido.dto.LoginRequest;
import com.aidkido.dto.SignupRequest;
import com.aidkido.model.User;
import com.aidkido.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private UserRepository repository;


    public User login(LoginRequest request) {

        User user = repo.findByEmail(request.getEmail());

        if (user == null) return null;

        if (!user.getPassword().equals(request.getPassword()))
            return null;

        return user;
    }

    public User signup(SignupRequest request) {

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // later you can hash

        return repository.save(user);
    }

}

