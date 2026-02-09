package com.aidkido.service;

import com.aidkido.model.Game;
import com.aidkido.repository.GameRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GameService {

    private final GameRepository repo;

    public GameService(GameRepository repo) {
        this.repo = repo;
    }

    public List<Game> getAllGames() {
        return repo.findAll();
    }

    public List<Game> recommendByAge(int age) {

        List<Game> all = repo.findAll();

        if (age <= 7)
            return all.stream()
                    .filter(g -> g.getLevel().equals("easy"))
                    .collect(Collectors.toList());

        return all;
    }
}
