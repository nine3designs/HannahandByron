/**
 * ============================================================
 *  WEDDING CONFIG — edit this file to update the whole site.
 * ============================================================
 *  weddingDateISO   — used by the countdown on home.html
 *                      format: "YYYY-MM-DDTHH:MM:SS"
 *  guestPassword    — what guests type in the envelope to
 *                      unlock the full site from index.html
 *
 *  NOTE ON SECURITY: this is a client-side "soft lock" — good
 *  enough to keep the full site from showing up in search
 *  engines or being stumbled on before launch, but the password
 *  lives in this public JS file, so a determined visitor could
 *  find it in the page source. Don't use it to hide anything
 *  sensitive. See README.md for how to add real protection
 *  (e.g. Netlify password protection, or a hosting provider
 *  with basic auth) once you're ready to go fully live.
 * ============================================================
 */
const WEDDING_CONFIG = {
  partner1: "Hannah",
  partner2: "Byron",
  weddingDateISO: "2027-05-28T13:00:00",
  venueName: "The Glass House",
  venueLocation: "Staining",
  guestPassword: "hannahandbyron",
};
