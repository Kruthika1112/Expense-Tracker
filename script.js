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
    const desc = document.getElementById("text").value;
    const amount = parseFloat(document.getElementById("amount").value);

    fetch("http://localhost:8080/addTransaction", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            description: desc,
            amount: amount
        })
    })
    .then(() => loadTransactions());
}


function deleteTransaction(id) {
    fetch(`http://localhost:8080/deleteTransaction/${id}`, {
        method: "DELETE"
    })
    .then(() => loadTransactions());
}


window.onload = loadTransactions;