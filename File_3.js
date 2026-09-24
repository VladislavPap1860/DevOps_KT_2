class BankAccount {
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
    this.history = [];
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Сумма пополнения должна быть положительной");
    this.balance += amount;
    this.history.push({ type: "deposit", amount });
  }

  withdraw(amount) {
    if (amount <= 0) throw new Error("Сумма снятия должна быть положительной");
    if (amount > this.balance) throw new Error("Недостаточно средств");
    this.balance -= amount;
    this.history.push({ type: "withdraw", amount });
  }
}

const account = new BankAccount("Иван", 1000);

const balanceEl = document.getElementById("balance");
const historyEl = document.getElementById("history");
const amountEl  = document.getElementById("amount");

function render() {
  balanceEl.textContent = `${account.balance.toFixed(2)} ₽`;

  historyEl.innerHTML = "";
  account.history
    .slice()
    .reverse()
    .forEach((op) => {
      const li = document.createElement("li");
      const isDeposit = op.type === "deposit";
      li.textContent = `${isDeposit ? "+" : "−"}${op.amount.toFixed(2)} ₽`;
      li.classList.add(isDeposit ? "history--plus" : "history--minus");
      historyEl.appendChild(li);
    });
}

function handle(action) {
  const amount = parseFloat(amountEl.value);
  if (isNaN(amount)) {
    alert("Введите корректную сумму");
    return;
  }

  try {
    action === "deposit" ? account.deposit(amount) : account.withdraw(amount);
    amountEl.value = "";
    render();
  } catch (err) {
    alert(err.message);
  }
}

document.getElementById("depositBtn")
  .addEventListener("click", () => handle("deposit"));

document.getElementById("withdrawBtn")
  .addEventListener("click", () => handle("withdraw"));

render();