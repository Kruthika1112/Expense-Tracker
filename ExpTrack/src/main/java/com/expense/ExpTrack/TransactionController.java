package com.expense.ExpTrack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    private TransactionRepository repo;

    @GetMapping("/getTransactions")
    public List<Transaction> getAllTransactions() {
        return repo.findAll();
    }

    @PostMapping("/addTransaction")
    public Transaction addTransaction(@RequestBody Transaction t) {
        return repo.save(t);
    }

    @DeleteMapping("/deleteTransaction/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        repo.deleteById(id);
    }
}