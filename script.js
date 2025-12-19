const BIN_ID = "6945d5ca43b1c97be9fa0121";
const API_KEY = "$2a$10$aO2hzVw6OCO7cl.73JIQc.EmlZu2dHu99W2h9iWfbkGHuK9EAdObe";
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

async function getData() {
  const res = await fetch(BASE_URL, {
    headers: { "X-Master-Key": API_KEY }
  });
  return res.json();
}

async function updateData(data) {
  await fetch(BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY
    },
    body: JSON.stringify(data)
  });
}

async function draw() {
  const username = document.getElementById("username").value.trim();
  const message = document.getElementById("message").value.trim();
  const result = document.getElementById("result");

  if (!username) return alert("Entre ton prénom");

  const data = (await getData()).record;

  if (data.players[username]) {
    return alert("🚫 Tu as déjà tiré !");
  }

  const possible = data.remaining.filter(n => n !== username);
  if (possible.length === 0) return alert("Plus personne à tirer");

  const chosen = possible[Math.floor(Math.random() * possible.length)];

  data.remaining = data.remaining.filter(n => n !== chosen);
  data.players[username] = { message };

  await updateData(data);

  result.innerHTML = `🎁 ${chosen}`;
  setTimeout(() => result.innerHTML = "🔒 Tirage terminé", 5000);
}
