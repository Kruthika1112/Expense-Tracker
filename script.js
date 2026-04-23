let pieChart;
let barChart;

function loadTransactions() {
    fetch("http://localhost:8080/getTransactions")
        .then(res => res.json())
        .then(data => {

            const list = document.getElementById("list");
            list.innerHTML = "";

            let income = 0;
            let expense = 0;

            let labels = [];
            let values = [];

            data.forEach(t => {

                const li = document.createElement("li");
                li.textContent = `${t.description} : ₹${t.amount}`;

                const btn = document.createElement("button");
                btn.textContent = "Delete";
                btn.onclick = () => deleteTransaction(t.id);

                li.appendChild(btn);
                list.appendChild(li);

                // ✅ calculate
                if (t.amount >= 0) {
                    income += t.amount;
                } else {
                    expense += Math.abs(t.amount);
                }

                labels.push(t.description);
                values.push(t.amount); // IMPORTANT
            });

            // ✅ update UI
            document.getElementById("income").textContent = "₹" + income;
            document.getElementById("expenses").textContent = "₹" + expense;
            document.getElementById("balance").textContent = "₹" + (income - expense);

            // 🔵 PIE CHART
            const pieCtx = document.getElementById("pieChart").getContext("2d");

            if (pieChart) pieChart.destroy();

            pieChart = new Chart(pieCtx, {
                type: "pie",
                data: {
                    labels: ["Income", "Expenses"],
                    datasets: [{
                        data: [income, expense],
                        backgroundColor: ["green", "red"]
                    }]
                }
            });

            // 🔵 BAR CHART
            const barCtx = document.getElementById("barChart").getContext("2d");

            if (barChart) barChart.destroy();

            barChart = new Chart(barCtx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Transactions",
                        data: values,
                        backgroundColor: values.map(v => v >= 0 ? "green" : "red")
                    }]
                }
            });

        })
        .catch(err => console.error(err));
}

function addTransaction() {

    const desc = document.getElementById("text").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (!desc || isNaN(amount)) {
        alert("Enter valid data");
        return;
    }

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
    .then(() => {
        document.getElementById("text").value = "";
        document.getElementById("amount").value = "";
        loadTransactions();
    });
}

function deleteTransaction(id) {
    fetch(`http://localhost:8080/deleteTransaction/${id}`, {
        method: "DELETE"
    })
    .then(() => loadTransactions());
}

window.onload = loadTransactions;