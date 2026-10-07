/* ==========================================================
   CLASSIFIED MISSION TIMELINE REVEAL ENGINE
   Author: Mohamed Hassain Akbar
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    ExperienceEngine.init();
});

const ExperienceEngine = {
    init() {
        this.cards = document.querySelectorAll(".mission-file");
        if (!this.cards.length) return;

        this.animateScrollReveal();
        this.hoverEffects();
    },

    animateScrollReveal() {
        if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

        gsap.registerPlugin(ScrollTrigger);

        // Animate central timeline line
        gsap.from(".timeline-line", {
            scaleY: 0,
            transformOrigin: "top",
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#experience",
                start: "top 70%"
            }
        });

        // Animate cards staggered reveal
        this.cards.forEach((card, index) => {
            gsap.from(card, {
                y: 80,
                opacity: 0,
                duration: 1,
                delay: index * 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%"
                }
            });
        });
    },

    hoverEffects() {
        this.cards.forEach(card => {
            card.addEventListener("mouseenter", () => {
                if (typeof gsap !== "undefined") {
                    gsap.to(card, {
                        scale: 1.02,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });

            card.addEventListener("mouseleave", () => {
                if (typeof gsap !== "undefined") {
                    gsap.to(card, {
                        scale: 1,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }
            });
        });
    }
};
