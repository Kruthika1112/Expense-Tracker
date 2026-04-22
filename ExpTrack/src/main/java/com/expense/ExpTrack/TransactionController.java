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

    // ✅ TOTAL
    @GetMapping("/total")
    public double total() {
        return repo.findAll()
                .stream()
                .mapToDouble(Transaction::getAmount)
                .sum();
    }

    // ✅ MONTHLY
    @GetMapping("/monthly")
    public double monthly() {
        return repo.findAll()
                .stream()
                .filter(t -> t.getDate().getMonthValue() == java.time.LocalDate.now().getMonthValue())
                .mapToDouble(Transaction::getAmount)
                .sum();
    }

    // ✅ PREDICTION
    @GetMapping("/predict")
    public double predict() {
        List<Transaction> list = repo.findAll();
        if (list.isEmpty()) return 0;

        double total = list.stream()
                .mapToDouble(Transaction::getAmount)
                .sum();

        return total / list.size();
    }

    // ✅ ALERT
    @GetMapping("/budget-alert")
    public String alert() {
        double total = monthly();
        return total > 5000 ? "⚠️ Budget exceeded!" : "✅ Within budget";
    }
}