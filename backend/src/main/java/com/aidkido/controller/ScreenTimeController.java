package com.aidkido.controller;

import com.aidkido.service.ScreenTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/time")
@CrossOrigin
public class ScreenTimeController {

    @Autowired
    private ScreenTimeService service;

    @PostMapping("/tick/{userId}")
    public int tick(@PathVariable Long userId) {
        return service.tick(userId);
    }

    @GetMapping("/remaining/{userId}")
    public int remaining(@PathVariable Long userId) {
        return service.getRemaining(userId);
    }
}

