// Side Navigation functionality

const navTrigger = document.getElementById('navTrigger');
const sideNavbar = document.getElementById('sideNavbar');
const navClose = document.getElementById('navClose');
const navLinks = document.querySelectorAll('.nav-link');

console.log('Navigation elements:', { navTrigger, sideNavbar, navClose, navLinksCount: navLinks.length });

// Toggle side navigation
function toggleSideNav() {
    if (sideNavbar) {
        sideNavbar.classList.toggle('active');
        console.log('Navigation toggled, active:', sideNavbar.classList.contains('active'));
    }
}

// Open side navigation
if (navTrigger) {
    navTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Nav trigger clicked');
        toggleSideNav();
    });
} else {
    console.error('Nav trigger not found');
}

// Close side navigation
function closeSideNav() {
    if (sideNavbar) {
        sideNavbar.classList.remove('active');
        console.log('Navigation closed');
    }
}

if (navClose) {
    navClose.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Nav close clicked');
        closeSideNav();
    });
} else {
    console.error('Nav close not found');
}

// Close navigation when clicking on a link
navLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
        console.log('Nav link clicked:', index);
        // Small delay to allow smooth navigation
        setTimeout(() => {
            closeSideNav();
        }, 300);

        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Scroll sections and update active navigation
let sections = document.querySelectorAll("section");

window.onscroll = () => {
    sections.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            // Update active navbar links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`.nav-link[data-section="${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
};

// Close navigation on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSideNav();
    }
});

// scroll reveal

ScrollReveal({
//   reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});
ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".home-img, .services-container, .portfolio-box, .contact form", { origin: "bottom" });
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

// typed js

// Check if element exists before initializing Typed.js
const multipleTextElement = document.querySelector('.multiple-text');
if (multipleTextElement) {
    const typed = new Typed('.multiple-text', {
        strings: ['a Problem Solver', 'a Creative Thinker', 'a Future Innovator', 'passionate about Tech'],
        typeSpeed: 80,
        backSpeed: 60,
        backDelay: 1500,
        loop: true
    });
}

// Project filtering

const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioBoxes = document.querySelectorAll('.portfolio-box');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioBoxes.forEach(box => {
            if (filterValue === 'all') {
                box.style.display = 'flex';
                box.style.animation = 'fadeIn 0.5s ease';
            } else {
                if (box.getAttribute('data-category') === filterValue) {
                    box.style.display = 'flex';
                    box.style.animation = 'fadeIn 0.5s ease';
                } else {
                    box.style.display = 'none';
                }
            }
        });
    });
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Education Slides Functionality
let currentSlide = 0;
const educationItems = document.querySelectorAll('.education-item');
const navDots = document.querySelectorAll('.nav-dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(index) {
    // Remove active class from all items and dots
    educationItems.forEach(item => {
        item.classList.remove('active', 'prev');
    });
    navDots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Add active class to current slide
    if (educationItems[index]) {
        educationItems[index].classList.add('active');
    }
    if (navDots[index]) {
        navDots[index].classList.add('active');
    }

    // Add prev class to previous slides
    for (let i = 0; i < index; i++) {
        if (educationItems[i]) {
            educationItems[i].classList.add('prev');
        }
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % educationItems.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + educationItems.length) % educationItems.length;
    showSlide(currentSlide);
}

// Event listeners for navigation
if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

// Event listeners for dots
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-slide functionality (optional)
let autoSlideInterval = setInterval(nextSlide, 5000);

// Pause auto-slide on hover
const educationSection = document.querySelector('.education-container');
if (educationSection) {
    educationSection.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    educationSection.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
}

// Initialize first slide
if (educationItems.length > 0) {
    showSlide(0);
}