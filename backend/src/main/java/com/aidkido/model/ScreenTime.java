package com.aidkido.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "user_screen_time")
public class ScreenTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private LocalDate date;

    private int secondsUsed;


    // ========= GETTERS & SETTERS =========

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getSecondsUsed() {
        return secondsUsed;
    }

    public void setSecondsUsed(int secondsUsed) {
        this.secondsUsed = secondsUsed;
    }
}

