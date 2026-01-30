const projectContents = [
    {
        title: "Tribute Page",
        description: "Une page hommage qui n'en n'est pas vraiment une. Cette page presente la salle de sport, son histoire, son concept, sa galerie photo et sa localisation. L’objectif était de travailler la mise en page, la hiérarchie visuelle et l’adaptation responsive du contenu (projet réaliser dans le cadre d'une certifications FreeCodeCamp)."
    },
    {
        title: "Titre Projet 2",
        description: "Voici la description du deuxième projet"
    },
    {
        title: "Titre Projet 3",
        description: "Troisième projet "
    },
    {
        title: "Titre Projet 4",
        description: "Dernier projet ."
    }
];

const projectCards = document.querySelectorAll('.project-card');
const projectTitle = document.getElementById('project-title');
const projectDescription = document.getElementById('project-description');
const projectContent = document.querySelector('.project-card-content');

let currentProjectIndex = 0;

// Fonction maj card de droite 
function updateProjectCard(index) {
    if (index === currentProjectIndex) return;
    
    // Effet de fade
    projectContent.classList.add('fade');
    
    setTimeout(() => {
        projectTitle.textContent = projectContents[index].title;
        projectDescription.textContent = projectContents[index].description;
        projectContent.classList.remove('fade');
        currentProjectIndex = index;
    }, 150);//ms 
}

// Détection de la card visible pendant le scroll
function checkVisibleProjectCard() {
const scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
const viewportCenter = scrollTop + window.innerHeight / 2;

let closestIndex = 0;
let closestDistance = Infinity;

projectCards.forEach((card, index) => {
const rect = card.getBoundingClientRect();
const cardTop = rect.top + scrollTop;
const cardCenter = cardTop + rect.height / 2;

const distance = Math.abs(cardCenter - viewportCenter);

if (distance < closestDistance) {
    closestDistance = distance;
    closestIndex = index;
}
});

updateProjectCard(closestIndex);
}


window.addEventListener('scroll', checkVisibleProjectCard);


checkVisibleProjectCard();



// CAROUSSEL

// Rotation du carrousel au scroll
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const carousel = document.querySelector('.carousel');
    const scrollSensitivity = 4 
  
    let currentRotation = 0;
    let isHovering = false;
    
    sliderContainer.addEventListener('mouseenter', function() {
        isHovering = true;
    });
    sliderContainer.addEventListener('mouseleave', function() {
        isHovering = false;
    });
    
    sliderContainer.addEventListener('wheel', function(e) {
        if (!isHovering) return;
        e.preventDefault();
        currentRotation += e.deltaY / scrollSensitivity;
        
        carousel.style.transform = `rotateY(${currentRotation}deg)`;
    }, { passive: false });
});