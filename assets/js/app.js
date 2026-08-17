/*==================================================
Natalie & Victoria Wedding Website
Main JavaScript
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Loader
    ========================================== */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.style.opacity = "0";
            loader.style.visibility = "hidden";

        }, 600);

    });

    /* ==========================================
       Sticky Navigation
    ========================================== */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });

    /* ==========================================
       Mobile Menu
    ========================================== */

    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {

        nav.classList.toggle("active");
        document.body.classList.toggle("menu-open");

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");
            document.body.classList.remove("menu-open");

        });

    });

    /* ==========================================
       Scroll Reveal
    ========================================== */

    const revealItems = document.querySelectorAll(".reveal");

    const reveal = () => {

        const trigger = window.innerHeight * 0.88;

        revealItems.forEach(item => {

            const top = item.getBoundingClientRect().top;

            if (top < trigger) {

                item.classList.add("active");

            }

        });

    };

    reveal();

    window.addEventListener("scroll", reveal);

    /* ==========================================
       FAQ Accordion
    ========================================== */

    document.querySelectorAll(".faq-question").forEach(button => {

        button.addEventListener("click", () => {

            const answer = button.nextElementSibling;

            if (answer.style.maxHeight) {

                answer.style.maxHeight = null;

            } else {

                document.querySelectorAll(".faq-answer").forEach(a => {

                    a.style.maxHeight = null;

                });

                answer.style.maxHeight = answer.scrollHeight + "px";

            }

        });

    });

    /* ==========================================
       Gallery Lightbox
    ========================================== */

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");

    document.querySelectorAll(".gallery-item img").forEach(image => {

        image.addEventListener("click", () => {

            lightbox.classList.add("active");
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

        });

    });

    document.querySelector(".close-lightbox").addEventListener("click", () => {

        lightbox.classList.remove("active");

    });

    lightbox.addEventListener("click", e => {

        if (e.target === lightbox) {

            lightbox.classList.remove("active");

        }

    });

    /* ==========================================
       Escape Key closes Lightbox
    ========================================== */

    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            lightbox.classList.remove("active");

        }

    });

    /* ==========================================
       Smooth Scroll (extra support)
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

    /* ==========================================
       RSVP Demo Submission
    ========================================== */

    const form = document.querySelector(".rsvp-form");

    if (form) {

        form.addEventListener("submit", e => {

            e.preventDefault();

            alert(
                "Thank you for your RSVP! We can't wait to celebrate with you."
            );

            form.reset();

        });

    }

});