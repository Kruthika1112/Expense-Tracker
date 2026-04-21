package com.expense.ExpTrack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ExpTrack")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
public class UserController {

    @Autowired
    private UserRepository repo;

    // ✅ LOGIN
    @PostMapping("/login")
    public Object login(@RequestBody User user) {

        User u = repo.findByUsername(user.getUsername());

        if (u == null || !u.getPassword().equals(user.getPassword())) {
            return new ErrorResponse("Invalid login");
        }

        return u;
    }

    // ✅ REGISTER (ADD THIS)
    @PostMapping("/register")
    public Object register(@RequestBody User user) {

        User existing = repo.findByUsername(user.getUsername());

        if (existing != null) {
            return new ErrorResponse("User already exists");
        }

        return repo.save(user);
    }
}