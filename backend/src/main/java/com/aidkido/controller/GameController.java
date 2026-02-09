package com.aidkido.controller;

import com.aidkido.model.Game;
import com.aidkido.service.GameService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "http://localhost:3000")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    // ===================================
    // GET all games
    // ===================================
    @GetMapping
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    // ===================================
    // GET recommended games
    // /api/games/recommend?age=7
    // ===================================
    @GetMapping("/recommend")
    public List<Game> recommend(@RequestParam int age) {
        return gameService.recommendByAge(age);
    }
}
