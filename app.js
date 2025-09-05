const form = document.getElementById("task-form");
const taskSection = document.getElementById("task-section");
const thankyouSection = document.getElementById("thankyou-section");
const thankyouMsg = document.getElementById("thankyou-msg");
const button = document.getElementById("cta-btn");

// Always show Task page at start
taskSection.classList.remove("hidden");
thankyouSection.classList.add("hidden");

// ✅ A/B Test Assignment
const variant = Math.random() < 0.5 ? "A" : "B";

// Apply variant design
if (variant === "A") {
  button.style.background = "linear-gradient(135deg, #ff6b81, #ff4757)";
  button.textContent = "Join Now 🚀";
} else {
  button.style.background = "linear-gradient(135deg, #2ed573, #1e90ff)";
  button.textContent = "Sign Up Free 🌟";
}

console.log("User got variant:", variant);

// On form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();

  if (name) {
    // Show Thank You
    taskSection.classList.add("hidden");
    thankyouSection.classList.remove("hidden");
    thankyouMsg.textContent = `Thank you, ${name}! 🎉`;

    // Save response (so you can analyze later)
    // For now just log, but can be sent to server/Google Sheets
    console.log(`User completed with Variant ${variant}`);

    // Start confetti
    startConfetti();
  }
});

// 🎊 Confetti Animation
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function randomColor() {
  const colors = ["#ff4757", "#1e90ff", "#2ed573", "#ffa502", "#eccc68"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createConfetti() {
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: 10,
      h: 20,
      color: randomColor(),
      speed: Math.random() * 3 + 2,
      angle: Math.random() * 360
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.w, p.h);
    p.y += p.speed;
    if (p.y > canvas.height) {
      p.y = -20;
      p.x = Math.random() * canvas.width;
    }
  });
}

function startConfetti() {
  createConfetti();
  setInterval(drawConfetti, 20);
}
