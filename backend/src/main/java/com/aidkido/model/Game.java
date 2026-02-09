package com.aidkido.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "games")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String description;
    private String icon;
    private String level;
    private String type;
}

