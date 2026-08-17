document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("[data-countdown]");
  if (!root || typeof WEDDING_CONFIG === "undefined") return;

  const target = new Date(WEDDING_CONFIG.weddingDateISO).getTime();
  const els = {
    days: root.querySelector("[data-days]"),
    hours: root.querySelector("[data-hours]"),
    mins: root.querySelector("[data-mins]"),
    secs: root.querySelector("[data-secs]"),
  };
  const pad = (n) => String(n).padStart(2, "0");

  function tick() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      root.innerHTML = '<p class="eyebrow">Today\u2019s the day \u2014 see you there</p>';
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    if (els.days) els.days.textContent = days;
    if (els.hours) els.hours.textContent = pad(hours);
    if (els.mins) els.mins.textContent = pad(mins);
    if (els.secs) els.secs.textContent = pad(secs);
  }

  tick();
  const timer = setInterval(tick, 1000);
});
