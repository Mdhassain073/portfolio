/* ==========================================================
   ANIMATION & SCROLL TRIGGER ENGINE
   Author: Mohamed Hassain Akbar
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    AnimationEngine.init();
});

const AnimationEngine = {
    init() {
        if (typeof AOS !== "undefined") {
            AOS.init({
                duration: 800,
                easing: "ease-out-cubic",
                once: true,
                offset: 60,
            });
        }
    }
};
