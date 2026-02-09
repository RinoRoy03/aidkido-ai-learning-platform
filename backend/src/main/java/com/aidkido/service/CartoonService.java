package com.aidkido.service;

import com.aidkido.model.Cartoon;
import com.aidkido.repository.CartoonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartoonService {

    private final CartoonRepository cartoonRepository;

    public List<Cartoon> getAllCartoons() {
        return cartoonRepository.findAll();
    }
}
