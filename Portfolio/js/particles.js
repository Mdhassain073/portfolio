/* ==========================================================
   AMBIENT CYBER BINARY MATRIX STREAM ENGINE (HIGH PERFORMANCE)
   Author: Mohamed Hassain Akbar
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    BinaryMatrixEngine.init();
});

const BinaryMatrixEngine = {
    init() {
        const canvas = document.getElementById("binaryCanvas");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let isVisible = true;
        let animationFrameId = null;
        let lastFrameTime = 0;
        const fpsInterval = 1000 / 30; // Throttle matrix rain to ~30 FPS for authentic terminal feel & low CPU usage

        let resizeTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
                initColumns();
            }, 150);
        });

        const chars = "01VULNXPLOITCYBERSECURITY01";
        const fontSize = 18;
        let columns = Math.floor(width / fontSize);
        let drops = [];

        function initColumns() {
            columns = Math.floor(width / fontSize);
            drops = new Array(columns);
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.floor(Math.random() * -80);
            }
        }
        initColumns();

        function draw(timestamp) {
            if (!isVisible || document.hidden) {
                animationFrameId = null;
                return;
            }

            animationFrameId = requestAnimationFrame(draw);

            const elapsed = timestamp - lastFrameTime;
            if (elapsed < fpsInterval) return;
            lastFrameTime = timestamp - (elapsed % fpsInterval);

            ctx.fillStyle = "rgba(3, 7, 18, 0.12)";
            ctx.fillRect(0, 0, width, height);

            ctx.font = `${fontSize}px 'Space Grotesk', monospace`;

            for (let i = 0; i < drops.length; i++) {
                ctx.fillStyle = i % 5 === 0 ? "rgba(56, 189, 248, 0.08)" : "rgba(0, 245, 160, 0.05)";
                
                const text = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                if (y > height && Math.random() > 0.985) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        }

        // Pause canvas when out of view or tab inactive
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (isVisible && !animationFrameId && !document.hidden) {
                    lastFrameTime = performance.now();
                    animationFrameId = requestAnimationFrame(draw);
                }
            });
        }, { threshold: 0.01 });

        observer.observe(canvas);

        document.addEventListener("visibilitychange", () => {
            if (!document.hidden && isVisible && !animationFrameId) {
                lastFrameTime = performance.now();
                animationFrameId = requestAnimationFrame(draw);
            }
        });

        // Start engine
        animationFrameId = requestAnimationFrame(draw);
    }
};
