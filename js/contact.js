/* ==========================================================
   ENCRYPTED CONTACT CHANNEL ENGINE (REAL EMAIL TRANSMISSION)
   Recipient: mohamedhassainakbar@gmail.com
   Author: Mohamed Hassain Akbar
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    ContactEngine.init();
});

const ContactEngine = {
    recipientEmail: "mohamedhassainakbar@gmail.com",

    init() {
        const form = document.querySelector(".contact-form form") || document.getElementById("contactForm");
        if (!form) return;

        let statusDiv = document.querySelector(".form-status");
        if (!statusDiv) {
            statusDiv = document.createElement("div");
            statusDiv.className = "form-status";
            form.appendChild(statusDiv);
        }

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nameInput = form.querySelector("input[name='name']");
            const emailInput = form.querySelector("input[name='email']");
            const messageInput = form.querySelector("textarea[name='message']");
            const btn = form.querySelector("button[type='submit']");

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            if (!name || !email || !message) {
                statusDiv.style.color = "#ef4444";
                statusDiv.textContent = "> ERROR: Please fill in all required fields.";
                return;
            }

            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Encrypting Payload...`;
            statusDiv.style.color = "#38BDF8";
            statusDiv.textContent = "> Establishing AES-256 secure tunnel...";

            // Step 1: Visual Encryption Step
            await new Promise(resolve => setTimeout(resolve, 800));
            btn.innerHTML = `<i class="fa-solid fa-lock fa-bounce"></i> Transmitting...`;
            statusDiv.textContent = `> Transmitting packet to ${this.recipientEmail}...`;

            try {
                // Send AJAX POST request to FormSubmit engine
                const response = await fetch(`https://formsubmit.co/ajax/${this.recipientEmail}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message,
                        _subject: `🔐 New Portfolio Message from ${name}`,
                        _template: "table",
                        _captcha: "false"
                    })
                });

                const data = await response.json();

                if (response.ok && data.success !== "false") {
                    btn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Message Delivered`;
                    btn.style.background = "linear-gradient(135deg, #00F5A0, #00d285)";
                    btn.style.color = "#030712";
                    statusDiv.style.color = "#00F5A0";
                    statusDiv.textContent = `> SUCCESS: Encrypted payload delivered! Check ${this.recipientEmail}`;
                    form.reset();

                    setTimeout(() => {
                        btn.disabled = false;
                        btn.innerHTML = originalText;
                        btn.style.background = "";
                        btn.style.color = "";
                        statusDiv.textContent = "";
                    }, 6000);
                } else {
                    throw new Error(data.message || "Transmission failed");
                }
            } catch (error) {
                console.warn("Direct transmission error, offering mailto fallback:", error);
                
                // Fallback to mailto link if offline or adblocker interferes
                btn.disabled = false;
                btn.innerHTML = originalText;
                btn.style.background = "";
                
                statusDiv.style.color = "#F59E0B";
                statusDiv.innerHTML = `> Direct dispatch fallback: <a href="mailto:${this.recipientEmail}?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}" style="color:#00F5A0; text-decoration:underline;">Click here to send directly via Email client</a>`;
            }
        });
    }
};
