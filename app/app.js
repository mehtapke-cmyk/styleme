(() => {
  const tabs = document.querySelectorAll('.tab');
  const screens = document.querySelectorAll('.screen');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      tabs.forEach(t => t.classList.toggle('is-active', t === tab));
      screens.forEach(s => s.classList.toggle('is-active', s.dataset.screen === target));
      const scroller = document.querySelector(`.screen[data-screen="${target}"] .screen-scroll`);
      if (scroller) scroller.scrollTop = 0;
    });
  });

  // Mood chips (Ce matin)
  document.querySelectorAll('.mood-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.parentElement.querySelectorAll('.mood-chip').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
    });
  });

  // Filter chips (Dressing)
  document.querySelectorAll('.filters .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.parentElement.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
    });
  });

  // J'adopte → toast
  document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.textContent.trim() === "J'adopte") {
      btn.addEventListener('click', () => {
        btn.textContent = "✓ Ajoutée à mes tenues";
        btn.disabled = true;
        btn.style.opacity = "0.7";
        setTimeout(() => {
          btn.textContent = "J'adopte";
          btn.disabled = false;
          btn.style.opacity = "";
        }, 2200);
      });
    }
  });
})();
