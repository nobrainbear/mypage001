console.log("🧠 script.js betöltve");

window.addEventListener("load", () => {
  console.log("🌐 window load OK");

  const overlay = document.getElementById("overlay");
  const enter = document.getElementById("enter");
  const video = document.getElementById("bg");

  console.log("overlay:", overlay);
  console.log("enter:", enter);
  console.log("video:", video);

  if (!overlay || !enter || !video) {
    console.error("❌ Valamelyik elem nem található. Ellenőrizd az ID-ket!");
    return;
  }

  // induláskor
  video.pause();
  video.volume = 0;
  video.muted = false; // legyen hang

  function start() {
    console.log("✅ CLICK DETECTED");

    // ne fusson többször
    if (overlay.classList.contains("hidden")) return;

    overlay.classList.add("hidden");

    // videó indítás
    const p = video.play();
    if (p && p.catch) {
      p.catch(err => console.error("🎥 Video play hiba:", err));
    }

    // 1.5s alatt fényerő + hangerő fel
    const duration = 1500;
    const startTime = performance.now();

    function step(now) {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = t * t * (3 - 2 * t); // smoothstep

      video.style.filter = `brightness(${eased})`;
      video.volume = eased;

      if (t < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  overlay.addEventListener("click", start);
  enter.addEventListener("click", (e) => {
    e.stopPropagation();
    start();
  });
});
