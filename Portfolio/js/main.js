/* ==========================================================
   MAIN SYSTEM ORCHESTRATOR & NAVBAR CONTROLLER (OPTIMIZED)
   Author: Mohamed Hassain Akbar
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    MainEngine.init();
});

const MainEngine = {
    init() {
        this.navbar = document.getElementById("navbar");
        this.sections = document.querySelectorAll("section[id]");
        this.navLinks = document.querySelectorAll(".nav-links a");
        
        this.mobileNav();
        this.initScrollListener();
        this.initTilt();
    },

    initScrollListener() {
        if (!this.navbar && !this.sections.length) return;

        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const onScroll = () => {
            const currentScrollY = window.pageYOffset;

            // Navbar Scrolled & Hide/Show State
            if (this.navbar) {
                if (currentScrollY > 80) {
                    this.navbar.classList.add("scrolled");
                } else {
                    this.navbar.classList.remove("scrolled");
                }

                if (currentScrollY > lastScrollY && currentScrollY > 250) {
                    this.navbar.classList.add("nav-hidden");
                } else {
                    this.navbar.classList.remove("nav-hidden");
                }
            }

            // ScrollSpy active link detection
            let activeId = "";
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop - 160;
                const sectionHeight = section.offsetHeight;
                if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
                    activeId = section.getAttribute("id");
                }
            });

            if (activeId) {
                this.navLinks.forEach(link => {
                    const href = link.getAttribute("href");
                    if (href === `#${activeId}`) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            }

            lastScrollY = currentScrollY;
            ticking = false;
        };

        window.addEventListener("scroll", () => {
            if (!ticking) {
                requestAnimationFrame(onScroll);
                ticking = true;
            }
        }, { passive: true });
    },

    mobileNav() {
        const navContainer = document.querySelector(".nav-container");
        const navLinks = document.querySelector(".nav-links");
        if (!navContainer || !navLinks) return;

        let toggleBtn = document.querySelector(".nav-toggle");
        if (!toggleBtn) {
            toggleBtn = document.createElement("button");
            toggleBtn.className = "nav-toggle";
            toggleBtn.setAttribute("aria-label", "Toggle Menu");
            toggleBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
            navContainer.appendChild(toggleBtn);
        }

        toggleBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const isOpen = navLinks.classList.contains("active");
            toggleBtn.innerHTML = isOpen ? `<i class="fa-solid fa-xmark"></i>` : `<i class="fa-solid fa-bars"></i>`;
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                if (toggleBtn) {
                    toggleBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
                }
            });
        });
    },

    initTilt() {
        if (typeof VanillaTilt !== "undefined") {
            VanillaTilt.init(document.querySelectorAll(".project-card, .certificate-card, .glass-card, .resume-card"), {
                max: 8,
                speed: 400,
                glare: true,
                "max-glare": 0.15,
            });
        }
    }
};
