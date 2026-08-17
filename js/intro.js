/**
 * Hannah & Byron
 * Opening envelope intro animation
 *
 * The intro plays once per browser session.
 * Remove sessionStorage logic if you want it to play every visit.
 */

document.addEventListener("DOMContentLoaded", () => {

  const intro = document.getElementById("intro-envelope");
  const seal = document.getElementById("intro-seal");

  if (!intro || !seal) return;


  /* ---------------------------------------------------------
     Skip intro if already opened during this session
     --------------------------------------------------------- */

  if (sessionStorage.getItem("hb-intro-opened") === "true") {
    intro.remove();
    return;
  }


  /* ---------------------------------------------------------
     Open animation
     --------------------------------------------------------- */

  const openInvitation = () => {

    if (intro.classList.contains("is-opening")) return;

    intro.classList.add("is-opening");

    /*
      Allow the flap/card animation to play before
      removing the intro completely.
    */

    window.setTimeout(() => {
      intro.classList.add("is-complete");
    }, 1700);


    /*
      Remove it from the DOM after the fade-out.
    */

    window.setTimeout(() => {
      intro.remove();
    }, 2700);


    /*
      Remember that this visitor has opened the invitation.
    */

    sessionStorage.setItem("hb-intro-opened", "true");
  };


  /* ---------------------------------------------------------
     Click / touch
     --------------------------------------------------------- */

  seal.addEventListener("click", openInvitation);


  /*
    Keyboard accessibility
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
