// Add event listener to download CV button
document.querySelector('.download-cv').addEventListener('click', () => {
    // Create a new link element
    const link = document.createElement('a');
    link.href = 'https://roadmap.sh/pdfs/roadmaps/frontend.pdf'; // Replace with your CV URL
    link.download = 'George_CV.pdf';
    link.click();
});

// Animate hero section
const hero = document.querySelector('.hero');
hero.classList.add('animate');
setTimeout(() => {
    hero.classList.remove('animate');
}, 2000);

// Animate project cards
const projectCards = document.querySelectorAll('.project-container');
projectCards.forEach((card) => {
    card.classList.add('animate');
    setTimeout(() => {
        card.classList.remove('animate');
    }, 2000);
});

// Animate skill cards
const skillCards = document.querySelectorAll('.skill-container');
skillCards.forEach((card) => {
    card.classList.add('animate');
    setTimeout(() => {
        card.classList.remove('animate');
    }, 2000);
});

const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links ul');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

function toggleCertificate(button) {
    const certificateSection = button.nextElementSibling;
    if (certificateSection.classList.contains('hidden')) {
        certificateSection.classList.remove('hidden');
        certificateSection.style.display = 'block';
        button.textContent = 'Hide Certificate';
    } else {
        certificateSection.classList.add('hidden');
        certificateSection.style.display = 'none';
        button.textContent = 'Show Certificate';
    }
}
document.querySelectorAll('.certificate img').forEach((img) => {
    img.onload = () => {
        if (img.naturalHeight > img.naturalWidth) {
            img.classList.add('vertical');
        }
    };
});
