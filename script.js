function loadTransactions() {
    fetch("http://localhost:8080/getTransactions")
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("list");
            list.innerHTML = "";

            let income = 0;
            let expense = 0;

            data.forEach(t => {
                const li = document.createElement("li");
                li.textContent = `${t.description} : ₹${t.amount}`;

                const btn = document.createElement("button");
                btn.textContent = "Delete";
                btn.onclick = () => deleteTransaction(t.id);

                li.appendChild(btn);
                list.appendChild(li);

                if (t.amount >= 0) {
                    income += t.amount;
                } else {
                    expense += Math.abs(t.amount);
                }
            });

            document.getElementById("income").textContent = "₹" + income;
            document.getElementById("expenses").textContent = "₹" + expense;
            document.getElementById("balance").textContent = "₹" + (income - expense);
        });
}


function addTransaction() {
    let desc = document.getElementById("desc").value;
    let amount = document.getElementById("amount").value;

    // Treat everything as expense for now
    amount = -Math.abs(amount);

    fetch("http://localhost:8080/addTransaction", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            description: desc,
            amount: amount,
            date: new Date().toISOString().split("T")[0]
        })
    });
}


function deleteTransaction(id) {
    fetch(`http://localhost:8080/deleteTransaction/${id}`, {
        method: "DELETE"
    })
    .then(() => loadTransactions());
}
async function loadSummary() {
    const total = await fetch("http://localhost:8080/total").then(r => r.text());
    const monthly = await fetch("http://localhost:8080/monthly").then(r => r.text());
    const predict = await fetch("http://localhost:8080/predict").then(r => r.text());
    const alert = await fetch("http://localhost:8080/budget-alert").then(r => r.text());

    console.log(total, monthly, predict, alert);
}

window.onload = loadTransactions;