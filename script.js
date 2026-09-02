document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("locked");

  const intro = document.getElementById("intro");
  const shell = document.getElementById("shell");
  const site = document.getElementById("site");
  let opened = false;

  function openInvitation() {
    if (opened) return;
    opened = true;
    shell.classList.add("is-open");

    // Открытие конверта: даём анимации завершиться перед показом сайта.
    setTimeout(() => {
      site.classList.add("is-visible");
      site.setAttribute("aria-hidden", "false");
      intro.classList.add("is-hidden");
      document.body.classList.remove("locked");
      window.scrollTo(0, 0);
      startCountdown();
      observeReveals();
    }, 1000);
  }

  shell.addEventListener("click", openInvitation);
  shell.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openInvitation();
    }
  });

  function startCountdown() {
    const target = new Date("2026-10-31T12:00:00+03:00").getTime();
    const els = {
      days: document.querySelector('[data-unit="days"]'),
      hours: document.querySelector('[data-unit="hours"]'),
      minutes: document.querySelector('[data-unit="minutes"]'),
      seconds: document.querySelector('[data-unit="seconds"]')
    };

    function tick() {
      const diff = Math.max(0, target - Date.now());
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      els.days.textContent = String(days).padStart(3, "0");
      els.hours.textContent = String(hours).padStart(2, "0");
      els.minutes.textContent = String(minutes).padStart(2, "0");
      els.seconds.textContent = String(seconds).padStart(2, "0");
    }

    tick();
    setInterval(tick, 1000);
  }

  function observeReveals() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    items.forEach((el) => observer.observe(el));
  }
});
