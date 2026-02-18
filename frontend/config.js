// config.js
// Détecte automatiquement local ou production
const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:4200"             // ton backend local
  : "https://go-fullstack-qfd9.onrender.com"; // backend Render

// Rendre accessible à tous les autres JS
window.API_URL = API_URL;
console.log("Backend URL =", window.API_URL);
