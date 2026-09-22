document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       TYPING EFFECT
    ========================= */

    const typingText =
        document.getElementById("typing-text");

    const messages = [
        "Web Developer",
        "Computer Science Student",
        "Website Designer"
    ];

    let messageIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentMessage =
            messages[messageIndex];

        if (!deleting) {

            typingText.textContent =
                currentMessage.substring(
                    0,
                    characterIndex + 1
                );

            characterIndex++;

            if (
                characterIndex ===
                currentMessage.length
            ) {
                deleting = true;

                setTimeout(typeEffect, 1500);
                return;
            }

        } else {

            typingText.textContent =
                currentMessage.substring(
                    0,
                    characterIndex - 1
                );

            characterIndex--;

            if (characterIndex === 0) {
                deleting = false;

                messageIndex =
                    (messageIndex + 1) %
                    messages.length;
            }

        }

        setTimeout(
            typeEffect,
            deleting ? 60 : 100
        );
    }

    typeEffect();


    /* =========================
       SMOOTH NAVIGATION
    ========================= */

    const navLinks =
        document.querySelectorAll(".nav a");

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const target =
                link.getAttribute("href");

            if (
                target &&
                target.startsWith("#")
            ) {

                event.preventDefault();

                const section =
                    document.querySelector(target);

                if (section) {
                    section.scrollIntoView({
                        behavior: "smooth"
                    });
                }

            }

        });

    });


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements =
        document.querySelectorAll(
            ".section, .project-card, .skill-card, .service-card"
        );

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.1
            }
        );

    revealElements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });

});