// ===== ORIGINAL HOLD TO LISTEN =====
const holdArea = document.getElementById("holdArea");
const song = document.getElementById("song");
const statusText = document.getElementById("status");

function startPlay() {
  song.play();
  statusText.innerText = "Listening together 💞";
  holdArea.style.background = "#ffe3f1";
}

function stopPlay() {
  song.pause();
  statusText.innerText = "Press and hold…";
  holdArea.style.background = "#fff0f6";
}

// Desktop
holdArea.addEventListener("mousedown", startPlay);
holdArea.addEventListener("mouseup", stopPlay);
holdArea.addEventListener("mouseleave", stopPlay);

// Mobile
holdArea.addEventListener("touchstart", startPlay);
holdArea.addEventListener("touchend", stopPlay);


// ===== VINYL ROTATION PLAYER (FIXED) =====

const vinyl = document.getElementById("vinyl");

let isDraggingVinyl = false;
let lastAngle = 0;
let rotation = 0;
let stopTimer = null;

// start dragging vinyl
vinyl.addEventListener("mousedown", () => {
  isDraggingVinyl = true;
});

// stop dragging
document.addEventListener("mouseup", () => {
  isDraggingVinyl = false;
  song.pause();
});

// rotate vinyl with mouse
document.addEventListener("mousemove", (e) => {
  if (!isDraggingVinyl) return;

  const rect = vinyl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
  const delta = angle - lastAngle;

  // rotate visually
  rotation += delta;
  vinyl.style.transform = `rotate(${rotation}deg)`;

  // only play if real movement
  if (Math.abs(delta) > 2) {
    song.play();

    // if user stops moving for 120ms -> pause
    clearTimeout(stopTimer);
    stopTimer = setTimeout(() => {
      song.pause();
    }, 120);
  }

  lastAngle = angle;
});
// ===== REAL JELLY FLOATING PHYSICS =====

const jellies = document.querySelectorAll(".jelly");

jellies.forEach(jelly => {
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;

  let size = 60 + Math.random() * 60; // different sizes
  jelly.style.width = size + "px";

  let speedY = 0.3 + Math.random() * 0.5;
  let sway = 1 + Math.random() * 2;
  let angle = Math.random() * 360;

  function animate() {
    y -= speedY;
    angle += 0.6;

    x += Math.sin(angle * 0.02) * sway;

    if (y < -120) {
      y = window.innerHeight + 50;
      x = Math.random() * window.innerWidth;
    }

    jelly.style.transform =
      `translate(${x}px, ${y}px) rotate(${Math.sin(angle * 0.01) * 12}deg)`;

    requestAnimationFrame(animate);
  }

  animate();
});
