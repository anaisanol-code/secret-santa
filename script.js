// 🔹 LISTE DES PARTICIPANTS (MODIFIE ICI SI BESOIN)
const PARTICIPANTS = [
  "Anaïs",
  "Charmaine",
  "Christelle",
  "Khadidja",
  "Gaspard",
  "Loan",
  "Judner"
];

// Initialisation
if (!localStorage.getItem("remaining")) {
  localStorage.setItem("remaining", JSON.stringify(PARTICIPANTS));
}
if (!localStorage.getItem("players")) {
  localStorage.setItem("players", JSON.stringify([]));
}

function drawName() {
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim();
  const result = document.getElementById("result");

  if (!username) {
    result.innerText = "❌ Entre ton prénom";
    return;
  }

  let remaining = JSON.parse(localStorage.getItem("remaining"));
  let players = JSON.parse(localStorage.getItem("players"));

  // 🔒 Déjà joué
  if (players.includes(username)) {
    result.innerText = "🚫 Tu as déjà tiré, c’est fini 😌";
    return;
  }

  // Empêcher de tomber sur soi-même
  let possible = remaining.filter(name => name !== username);

  if (possible.length === 0) {
    result.innerText = "🎉 Plus personne à tirer";
    return;
  }

  const chosen = possible[Math.floor(Math.random() * possible.length)];

  // Mise à jour
  remaining = remaining.filter(name => name !== chosen);
  players.push(username);

  localStorage.setItem("remaining", JSON.stringify(remaining));
  localStorage.setItem("players", JSON.stringify(players));

  usernameInput.disabled = true;

  result.innerHTML = `
    🎁 Tu offres un cadeau à :<br>
    <strong>${chosen}</strong>
  `;
}
