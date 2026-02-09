package com.aidkido.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cartoon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;   // Tom & Jerry, Mr Bean

    private String title;      // Classic Chase

    private String videoId;    // YouTube id only (small + safe)
}
