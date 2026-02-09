package com.aidkido.controller;

import com.aidkido.model.Cartoon;
import com.aidkido.service.CartoonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cartoons")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CartoonController {

    private final CartoonService cartoonService;

    @GetMapping
    public List<Cartoon> getCartoons() {
        return cartoonService.getAllCartoons();
    }
}
