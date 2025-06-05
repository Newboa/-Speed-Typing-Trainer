const textSamples = [
  "Le renard brun rapide saute par-dessus le chien paresseux.",
  "Apprendre à coder est une compétence précieuse en 2025.",
  "Chaque jour est une opportunité de s'améliorer.",
  "La persévérance mène au succès.",
  "JavaScript est un langage très polyvalent."
];

const userInput = document.getElementById("userInput");
const textToType = document.getElementById("textToType");
const statsDisplay = document.getElementById("stats");
const bestScoreDisplay = document.getElementById("bestScoreDisplay");

let startTime = null;
let currentText = "";

function pickRandomText() {
  return textSamples[Math.floor(Math.random() * textSamples.length)];
}

function startNew() {
  currentText = pickRandomText();
  textToType.innerText = currentText;
  userInput.value = "";
  statsDisplay.innerText = "";
  startTime = null;
}

function countMistakes(expected, actual) {
  let mistakes = 0;
  for (let i = 0; i < expected.length; i++) {
    if (expected[i] !== actual[i]) mistakes++;
  }
  return mistakes + Math.abs(expected.length - actual.length);
}

function updateBestScore(wpm) {
  let best = parseFloat(localStorage.getItem("bestWPM") || 0);
  if (wpm > best) {
    localStorage.setItem("bestWPM", wpm);
    best = wpm;
  }
  bestScoreDisplay.innerText = `🏆 Meilleur score : ${best} WPM`;
}

userInput.addEventListener("input", () => {
  if (!startTime) startTime = new Date();

  if (userInput.value === currentText) {
    const elapsed = (new Date() - startTime) / 1000;
    const words = currentText.split(" ").length;
    const wpm = ((words / elapsed) * 60).toFixed(2);

    const mistakes = countMistakes(currentText, userInput.value);
    const accuracy = (100 - (mistakes / currentText.length) * 100).toFixed(2);

    statsDisplay.innerHTML = `
      ⏱️ Temps : ${elapsed.toFixed(2)}s<br>
      💨 Vitesse : ${wpm} WPM<br>
      ❌ Fautes : ${mistakes}<br>
      🎯 Précision : ${accuracy}%
    `;

    updateBestScore(wpm);
  }
});

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Initialisation
startNew();
updateBestScore(0);
