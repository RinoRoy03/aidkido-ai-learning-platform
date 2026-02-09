package com.aidkido.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "drawings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Drawing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originalImagePath;
    @Column(name = "ai_image_path")
    private String aiImagePath;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
