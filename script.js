function strengthen() {
  let pass = document.getElementById("inputPass").value;
  let output = document.getElementById("outputPass");

  if (!pass) {
    output.textContent = "Please enter a password first.";
    return;
  }

  // Replace weak characters
  let strong = pass
    .replace(/a/gi, "@")
    .replace(/s/gi, "$")
    .replace(/o/gi, "0")
    .replace(/i/gi, "1")
    .replace(/e/gi, "3");

  // Add random symbol + number
  const symbols = "!@#$%^&*()";
  const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
  const randomNum = Math.floor(Math.random() * 90 + 10);

  strong += randomSymbol + randomNum;

  // Random capitalization
  strong = strong
    .split("")
    .map(char => (Math.random() > 0.7 ? char.toUpperCase() : char))
    .join("");

  output.textContent = strong;

  updateStrength(strong);
}

function updateStrength(password) {
  const bar = document.getElementById("strengthBar");
  let score = 0;

  if (password.length >= 10) score += 25;
  if (/[A-Z]/.test(password)) score += 25;
  if (/[0-9]/.test(password)) score += 25;
  if (/[^A-Za-z0-9]/.test(password)) score += 25;

  bar.style.width = score + "%";

  if (score < 40) bar.style.background = "#ef4444";     // red
  else if (score < 70) bar.style.background = "#f59e0b"; // yellow
  else bar.style.background = "#22c55e";                 // green
}

function togglePass() {
  let input = document.getElementById("inputPass");
  input.type = input.type === "password" ? "text" : "password";
}

function copyPass() {
  let text = document.getElementById("outputPass").textContent;

  if (text === "Your stronger password will appear here" || text === "") {
    alert("Nothing to copy yet.");
    return;
  }

  navigator.clipboard.writeText(text);
  alert("Password copied!");
}