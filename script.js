const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".nav");

if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    // Close menu after clicking any navigation link
    document.querySelectorAll(".nav a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });

}


// ===============================
// REVEAL ANIMATION
// ===============================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                // Animation only once
                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


// ===============================
// SERVICE CARD HOVER EFFECT
// ===============================

const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        serviceCards.forEach(item => {

            if (item !== card) {
                item.style.opacity = "0.65";
            }

        });

    });


    card.addEventListener("mouseleave", () => {

        serviceCards.forEach(item => {
            item.style.opacity = "1";
        });

    });

});


// ===============================
// CONTACT FORM
// ===============================

const contactForm = document.getElementById("contactForm");

// WhatsApp number the inquiry should go to (company's own number)
// Format: country code + number, no +, no spaces, no dashes
const WHATSAPP_NUMBER = "16479175500";

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const button = contactForm.querySelector("button");

        if (!button) return;

        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const company = contactForm.company.value.trim();
        const phone = contactForm.phone.value.trim();
        const message = contactForm.message.value.trim();

        // Build the WhatsApp message text
        let text = "New Freight Inquiry – North American Flatbed%0a%0a";
        text += `Name: ${name}%0a`;
        text += `Email: ${email}%0a`;
        if (company) text += `Company: ${company}%0a`;
        if (phone) text += `Phone: ${phone}%0a`;
        if (message) text += `Message: ${message}%0a`;

        const whatsappUrl =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                text.replace(/%0a/g, "\n")
            )}`;

        // Open WhatsApp with the inquiry pre-filled
        window.open(whatsappUrl, "_blank");

        button.innerHTML = "Message Sent ✓";

        button.disabled = true;


        setTimeout(() => {

            button.innerHTML = 'Send Inquiry <span>→</span>';

            button.disabled = false;

            contactForm.reset();

        }, 2500);

    });

}


// ===============================
// HEADER SCROLL EFFECT
// ===============================

const header = document.querySelector(".header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.style.boxShadow =
                "0 8px 30px rgba(0, 0, 0, 0.08)";

        } else {

            header.style.boxShadow = "none";

        }

    });

}


// ===============================
// SERVICE CARD CLICK EFFECT
// ===============================

serviceCards.forEach(card => {

    card.addEventListener("click", () => {

        serviceCards.forEach(item => {
            item.classList.remove("active");
        });

        card.classList.add("active");

    });

});


// ===============================
// DARK MODE
// ===============================

const themeToggle = document.getElementById("themeToggle");

// ADDITION: Logo reference
const siteLogo = document.getElementById("siteLogo");


// ===============================
// THEME LOGO
// ===============================

function updateThemeLogo() {

    if (!siteLogo) return;

    const isDark =
        document.body.classList.contains("dark-mode");

    siteLogo.src = isDark
        ? "images/logo-transparent.png"
        : "images/logo.jpeg";
}

// Check saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

updateThemeLogo();

// Toggle theme
if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");


        // Save theme
        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

        // Change icon
        themeToggle.textContent =
            isDark ? "☀" : "☾";

        // Change logo
        updateThemeLogo();

    });
}

// Set correct icon on page load
if (themeToggle) {

    const isDark =
        document.body.classList.contains("dark-mode");

    themeToggle.textContent =
        isDark ? "☀" : "☾";
}