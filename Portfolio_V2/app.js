// Thème clair/sombre
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('nav-active');
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        hamburger.classList.remove('active');
        nav.classList.remove('nav-active');
    });
});

// GSAP Scroll Reveal
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.reveal').forEach((elem) => {
    gsap.from(elem, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: elem,
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
    });
});

// Compteur animé
document.querySelectorAll('.counter').forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    gsap.to(counter, {
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        ease: 'power1.out',
        scrollTrigger: {
            trigger: counter,
            start: 'top 80%',
        },
    });
});

// Effet typing séquentiel
const typingElements = [
    ...document.querySelectorAll('.typing-text-1'),
    ...document.querySelectorAll('.typing-text-2'),
    ...document.querySelectorAll('.typing-text-3')
].filter(elem => elem); // Récupère tous les éléments dans l'ordre

function typeElement(elem, callback) {
    const text = elem.getAttribute('data-text');
    let index = 0;

    function type() {
        if (index < text.length) {
            elem.textContent = text.slice(0, index + 1);
            index++;
            setTimeout(type, 100); // Vitesse modérée (100ms par caractère)
        } else {
            elem.style.borderRight = 'none'; // Supprime le curseur
            if (callback) callback();
        }
    }

    type();
}

function typeSequentially(index) {
    if (index < typingElements.length) {
        gsap.from(typingElements[index], {
            opacity: 0,
            duration: 0.5,
            onComplete: () => typeElement(typingElements[index], () => typeSequentially(index + 1)),
            scrollTrigger: {
                trigger: typingElements[index],
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }
}

// Démarre la séquence si des éléments existent
if (typingElements.length > 0) {
    typeSequentially(0);
}