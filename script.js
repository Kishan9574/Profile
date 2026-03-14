// Custom Cursor Animation
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot purely follows cursor
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline tags along with slight delay using CSS transition
    // But we need to use JS animation for smoother effect in modern apps
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, {duration: 500, fill: "forwards"});
});

// Cursor hover effects on interactives
const linksAndButtons = document.querySelectorAll("a, button, .skill-card, .service-item");

linksAndButtons.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursorOutline.style.width = "60px";
        cursorOutline.style.height = "60px";
        cursorOutline.style.backgroundColor = "rgba(6, 182, 212, 0.1)";
        cursorOutline.style.borderColor = "var(--accent-color)";
    });
    
    el.addEventListener("mouseleave", () => {
        cursorOutline.style.width = "40px";
        cursorOutline.style.height = "40px";
        cursorOutline.style.backgroundColor = "transparent";
        cursorOutline.style.borderColor = "var(--primary-color)";
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Dynamic Typing Effect
const textsToType = [
    "Scalable Web Apps.",
    "Bespoke Business Solutions.",
    "Robust .NET Architectures.",
    "Modern APIs.",
    "Seamless User Experiences."
];

const typingElement = document.querySelector(".typing-text");
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
    const currentText = textsToType[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50; // Faster deleting
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100; // Normal typing
    }

    // Logic to switch between words
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textsToType.length;
        typingDelay = 500; // Pause before new word
    }

    setTimeout(typeEffect, typingDelay);
}

// Start typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
    if(typingElement) {
        setTimeout(typeEffect, 1000);
    }
});

// Smooth scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
