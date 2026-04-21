package com.expense.ExpTrack;

import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;
    private String password;

    // ✅ GETTERS
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    // ✅ SETTERS
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}