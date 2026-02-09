package com.aidkido.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:3000") // allow React
public class ChatController {

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping
    public String chat(@RequestBody String message) {

        try {
            // kid-friendly prompt
            String prompt = "You are a sweet friendly robot for kids. Reply simply: " + message;

            String encoded = URLEncoder.encode(prompt, StandardCharsets.UTF_8);

            String url = "https://text.pollinations.ai/" + encoded;

            return restTemplate.getForObject(url, String.class);

        } catch (Exception e) {
            return "Oops! Robot is sleepy. Try again!";
        }
    }
}
