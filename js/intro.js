document.addEventListener("DOMContentLoaded", () => {

  /*
   * ---------------------------------------------------------
   * DESKTOP
   * ---------------------------------------------------------
   *
   * Desktop does NOT show the envelope animation.
   * The normal index.html page loads immediately.
   */

  if (window.matchMedia("(min-width: 769px)").matches) {
    const intro = document.getElementById("intro-envelope");

    if (intro) {
      intro.remove();
    }

    return;
  }


  /*
   * ---------------------------------------------------------
   * MOBILE
   * ---------------------------------------------------------
   */

  const intro = document.getElementById("intro-envelope");
  const seal = document.getElementById("intro-seal");

  if (!intro || !seal) return;


  /*
   * If the invitation has already been opened during
   * this browser session, don't show the animation again.
   */

  if (sessionStorage.getItem("hb-intro-opened") === "true") {
    intro.remove();
    return;
  }


  /*
   * ---------------------------------------------------------
   * OPEN INVITATION
   * ---------------------------------------------------------
   */

  const openInvitation = () => {

    if (intro.classList.contains("is-opening")) {
      return;
    }

    intro.classList.add("is-opening");


    /*
     * Let the envelope animation play.
     */

    setTimeout(() => {
      intro.classList.add("is-complete");
    }, 1700);


    /*
     * Remove the intro completely after
     * the fade-out has finished.
     */

    setTimeout(() => {
      intro.remove();
    }, 2700);


    /*
     * Remember that the visitor has opened it.
     */

    sessionStorage.setItem("hb-intro-opened", "true");
  };


  /*
   * Mouse / touch
   */

  seal.addEventListener("click", openInvitation);


  /*
   * Keyboard accessibility
   */

  seal.addEventListener("keydown", (event) => {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      openInvitation();

    }

  });

});
