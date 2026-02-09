package com.aidkido.repository;

import com.aidkido.model.Cartoon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartoonRepository extends JpaRepository<Cartoon, Long> {

    List<Cartoon> findByCategory(String category);
}
