/* ==========================================================
   TACTICAL CYBER CURSOR ENGINE (HIGH PERFORMANCE DELEGATED)
   Author: Mohamed Hassain Akbar
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    CursorEngine.init();
});

const CursorEngine = {
    init() {
        const cursor = document.querySelector(".cursor");
        const cursorDot = document.querySelector(".cursor-dot");

        if (!cursor || !cursorDot) return;

        let mouseX = -100, mouseY = -100;
        let cursorX = -100, cursorY = -100;
        let isTicking = false;

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Direct 60FPS update for inner precision dot
            cursorDot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;

            if (!isTicking) {
                isTicking = true;
                requestAnimationFrame(updateCursor);
            }
        }, { passive: true });

        function updateCursor() {
            cursorX += (mouseX - cursorX) * 0.22;
            cursorY += (mouseY - cursorY) * 0.22;

            cursor.style.transform = `translate3d(${cursorX - 17}px, ${cursorY - 17}px, 0)`;

            if (Math.abs(mouseX - cursorX) > 0.1 || Math.abs(mouseY - cursorY) > 0.1) {
                requestAnimationFrame(updateCursor);
            } else {
                isTicking = false;
            }
        }

        // Global Event Delegation for interactive elements
        const interactiveSelector = "a, button, input, textarea, .project-card, .skill-node, .lab-card, .certificate-card, .mission-file, .profile-card-container, .hero-social a";

        document.addEventListener("mouseover", (e) => {
            if (e.target.closest(interactiveSelector)) {
                cursor.classList.add("cursor-hover");
            }
        }, { passive: true });

        document.addEventListener("mouseout", (e) => {
            if (e.target.closest(interactiveSelector)) {
                cursor.classList.remove("cursor-hover");
            }
        }, { passive: true });

        // Click pulse effect
        document.addEventListener("mousedown", () => {
            cursor.classList.add("cursor-click");
        }, { passive: true });

        document.addEventListener("mouseup", () => {
            cursor.classList.remove("cursor-click");
        }, { passive: true });
    }
};
