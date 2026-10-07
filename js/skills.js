/* ==========================================================
   INTERACTIVE SPIDER WEB SKILLS REVEAL ENGINE
   Author: Mohamed Hassain Akbar
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    SkillsWebEngine.init();
});

const SkillsWebEngine = {
    init() {
        this.wrapper = document.getElementById("skillsWrapper");
        this.core = document.getElementById("skillCore");
        this.svg = document.getElementById("skillsWebSvg");
        this.nodes = document.querySelectorAll(".skill-node");

        if (!this.wrapper || !this.core || !this.svg || !this.nodes.length) return;

        // Ensure default state is collapsed
        this.wrapper.classList.add("collapsed");
        this.wrapper.classList.remove("expanded");

        this.bindEvents();
        this.initIntersectionObserver();

        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.drawWebLines();
            }, 150);
        });
    },

    bindEvents() {
        // Touch/Hover Cyber Knowledge Core to trigger IN TO OUT reveal animation
        this.core.addEventListener("mouseenter", () => {
            this.revealNetwork();
            this.highlightAllLines(true);
        });

        this.core.addEventListener("mouseleave", () => {
            this.highlightAllLines(false);
        });

        this.core.addEventListener("click", () => {
            if (this.wrapper.classList.contains("expanded")) {
                this.collapseNetwork();
            } else {
                this.revealNetwork();
            }
        });

        // Hover individual nodes to highlight connected spider web lines
        this.nodes.forEach((node, index) => {
            node.addEventListener("mouseenter", () => {
                this.highlightNodeWeb(index);
            });

            node.addEventListener("mouseleave", () => {
                this.clearNodeWeb();
            });
        });
    },

    initIntersectionObserver() {
        // Auto-reveal once when user scrolls to the skills section
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        this.revealNetwork();
                    }, 400);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(this.wrapper);
    },

    revealNetwork() {
        this.wrapper.classList.remove("collapsed");
        this.wrapper.classList.add("expanded");
        
        // Delay drawing web lines until nodes shoot outwards
        setTimeout(() => {
            this.drawWebLines();
        }, 150);
    },

    collapseNetwork() {
        this.wrapper.classList.add("collapsed");
        this.wrapper.classList.remove("expanded");
        if (this.svg) this.svg.innerHTML = '';
    },

    drawWebLines() {
        if (!this.svg || !this.wrapper || !this.core) return;

        const wrapperRect = this.wrapper.getBoundingClientRect();
        const coreRect = this.core.getBoundingClientRect();

        const coreCenterX = (coreRect.left + coreRect.width / 2) - wrapperRect.left;
        const coreCenterY = (coreRect.top + coreRect.height / 2) - wrapperRect.top;

        let html = '';
        const nodeCoords = [];

        this.nodes.forEach((node, i) => {
            const rect = node.getBoundingClientRect();
            const nodeX = (rect.left + rect.width / 2) - wrapperRect.left;
            const nodeY = (rect.top + rect.height / 2) - wrapperRect.top;
            nodeCoords.push({ x: nodeX, y: nodeY });

            // Radial Laser Web Line: Core -> Node
            html += `<line x1="${coreCenterX}" y1="${coreCenterY}" x2="${nodeX}" y2="${nodeY}" class="radial-web" id="line-core-${i}" />`;
        });

        // Interconnecting Outer Spider Web Ring (Node -> Node)
        for (let i = 0; i < nodeCoords.length; i++) {
            const nextIdx = (i + 1) % nodeCoords.length;
            html += `<line x1="${nodeCoords[i].x}" y1="${nodeCoords[i].y}" x2="${nodeCoords[nextIdx].x}" y2="${nodeCoords[nextIdx].y}" class="outer-web" id="line-ring-${i}" />`;
        }

        this.svg.innerHTML = html;
    },

    highlightAllLines(active) {
        const lines = this.svg.querySelectorAll("line");
        lines.forEach(line => {
            if (active) {
                line.classList.add("active");
            } else {
                line.classList.remove("active");
            }
        });
    },

    highlightNodeWeb(nodeIndex) {
        const radialLine = document.getElementById(`line-core-${nodeIndex}`);
        const prevRingLine = document.getElementById(`line-ring-${(nodeIndex - 1 + this.nodes.length) % this.nodes.length}`);
        const nextRingLine = document.getElementById(`line-ring-${nodeIndex}`);

        if (radialLine) radialLine.classList.add("highlight");
        if (prevRingLine) prevRingLine.classList.add("highlight");
        if (nextRingLine) nextRingLine.classList.add("highlight");
    },

    clearNodeWeb() {
        const lines = this.svg.querySelectorAll("line");
        lines.forEach(line => line.classList.remove("highlight"));
    }
};
