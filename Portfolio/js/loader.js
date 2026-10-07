/* ==========================================================
   CYBER SECURITY AI LOADER ENGINE
   Author: Mohamed Hassain Akbar
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    LoaderEngine.init();
});

const LoaderEngine = {
    init() {
        const loader = document.getElementById("loader");
        const progressFill = document.querySelector(".progress-fill");
        const loaderStatus = document.querySelector(".loader-status");
        
        if (!loader) return;

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 5;
            if (progress > 100) progress = 100;
            
            if (progressFill) {
                progressFill.style.width = `${progress}%`;
            }

            if (progress === 100) {
                clearInterval(interval);
                if (loaderStatus) {
                    loaderStatus.textContent = "ACCESS GRANTED // ALL SYSTEMS ONLINE";
                    loaderStatus.style.color = "#00F5A0";
                    loaderStatus.style.textShadow = "0 0 15px rgba(0, 245, 160, 0.8)";
                }

                setTimeout(() => {
                    loader.style.opacity = "0";
                    loader.style.transform = "scale(1.05)";
                    loader.style.transition = "opacity 0.8s ease, transform 0.8s ease";

                    setTimeout(() => {
                        loader.style.display = "none";
                        document.body.classList.add("loaded");
                        
                        // Trigger AOS refresh if available
                        if (typeof AOS !== "undefined") {
                            AOS.refresh();
                        }
                    }, 800);
                }, 600);
            }
        }, 120);
    }
};
