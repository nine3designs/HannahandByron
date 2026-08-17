/**
 * Envelope lock: click the wax seal -> overlay + envelope appear ->
 * click again to lift the flap -> password field slides into view.
 * Correct password unlocks the full site (home.html) for this browser.
 */
document.addEventListener("DOMContentLoaded", () => {
  const trigger   = document.getElementById("seal-trigger");
  const overlay   = document.getElementById("lock-overlay");
  const envelope  = document.getElementById("envelope");
  const closeBtn  = document.getElementById("lock-close");
  const form      = document.getElementById("lock-form");
  const input     = document.getElementById("lock-password");
  const errorMsg  = document.getElementById("lock-error");

  if (!trigger || !overlay) return;

  const openOverlay = () => {
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    // small delay so the flap-lift feels like a deliberate second step
    window.setTimeout(() => envelope.classList.add("is-open"), 250);
    window.setTimeout(() => input && input.focus(), 700);
  };

  const closeOverlay = () => {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    envelope.classList.remove("is-open");
    errorMsg.hidden = true;
    if (input) input.value = "";
  };

  trigger.addEventListener("click", openOverlay);
  closeBtn.addEventListener("click", closeOverlay);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeOverlay(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeOverlay(); });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const entered = (input.value || "").trim().toLowerCase();
    const correct = (WEDDING_CONFIG.guestPassword || "").trim().toLowerCase();

    if (entered && entered === correct) {
      sessionStorage.setItem("hb-unlocked", "true");
      window.location.href = "home.html";
    } else {
      errorMsg.hidden = false;
      envelope.classList.add("shake");
      window.setTimeout(() => envelope.classList.remove("shake"), 420);
    }
  });
});

/**
 * Gate for the full-site pages: if a visitor lands directly on
 * home.html (or any inner page) without unlocking first, send them
 * back to the landing page. Remove this block (or the data-gated
 * attribute on <body>) once the site is fully public.
 */
(function gateFullSite() {
  const isGated = document.body.hasAttribute("data-gated");
  if (!isGated) return;
  const unlocked = sessionStorage.getItem("hb-unlocked") === "true";
  if (!unlocked) {
    window.location.href = "index.html";
  }
})();
