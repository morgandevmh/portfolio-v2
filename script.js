   document.addEventListener('DOMContentLoaded', () => {

    /* 1. HERO RAINBOW */
    (function generateRainbow() {
      const hero  = document.querySelector('.hero');
      const maskH = document.querySelector('.mask-h');
      if (!hero || !maskH) return;
  
      const styles = getComputedStyle(document.documentElement);
      const bg       = styles.getPropertyValue('--color-bg-page').trim();
      const c1       = styles.getPropertyValue('--color-rainbow-1').trim();
      const c2       = styles.getPropertyValue('--color-rainbow-2').trim();
      const c3       = styles.getPropertyValue('--color-rainbow-3').trim();
      const animTime = parseFloat(styles.getPropertyValue('--rainbow-animation'));
      const count    = parseInt(styles.getPropertyValue('--rainbow-count'), 10);
  
      // 6 permutations possibles des 3 couleurs
      const palettes = [
        [c1, c2, c3],
        [c1, c3, c2],
        [c3, c1, c2],
        [c3, c2, c1],
        [c2, c3, c1],
        [c2, c1, c3],
      ];
  
      for (let i = 1; i <= count; i++) {
        const div = document.createElement('div');
        div.className = 'rainbow';
  
        const colors = palettes[Math.floor(Math.random() * palettes.length)];
  
        div.style.boxShadow = [
          `-130px 0 80px 40px ${bg}`,
          `-50px 0 50px 25px ${colors[0]}`,
          `0 0 50px 25px ${colors[1]}`,
          `50px 0 50px 25px ${colors[2]}`,
          `130px 0 80px 40px ${bg}`,
        ].join(', ');
  
        const duration = animTime - (animTime / count / 2) * i;
        const delay    = -(i / count) * animTime;
        div.style.animationDuration = `${duration}s`;
        div.style.animationDelay    = `${delay}s`;
  
        hero.insertBefore(div, maskH);
      }
    })();
  
  
    /* 2. PROJECTS */
  
    const projectContents = [
      {
        title: "Application de gestion locative",
        description: " "
      },
      {
        title: "Labor",
        description: " "
      },
      {
        title: "Secura",
        description: ""
      },
      {
        title: "My Pokedex",
        description: " "
      }
    ];
  
    const projectCards       = document.querySelectorAll('.project-card');
    const projectTitle       = document.getElementById('project-title');
    const projectDescription = document.getElementById('project-description');
    const projectContent     = document.querySelector('.project-card-content');
  

  
    // Miseà jour de la card de droite avec effet fade
    let currentProjectIndex = 0;
    let fadeTimer = null;

    function updateProjectCard(index) {
      if (index === currentProjectIndex) return;

      clearTimeout(fadeTimer);
      projectContent.classList.add('fade');

      fadeTimer = setTimeout(() => {
        projectTitle.textContent       = projectContents[index].title;
        projectDescription.textContent = projectContents[index].description;
        projectContent.classList.remove('fade');
        currentProjectIndex = index;
      }, 200);
    }
  
    // Détecte la card active via IntersectionObserver
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Array.from(projectCards).indexOf(entry.target);
            updateProjectCard(index);
          }
        });
      }, {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      });

      projectCards.forEach(card => projectObserver.observe(card));
  
  
    /* 3. CAROUSEL */
    (function initCarousel() {
      const sliderContainer = document.querySelector('.slider-container');
      const carousel        = document.querySelector('.carousel');
      if (!sliderContainer || !carousel) return;
  
      const scrollSensitivity = 4;
      let currentRotation = 0;
      let isHovering      = false;
  
      sliderContainer.addEventListener('mouseenter', () => { isHovering = true;  });
      sliderContainer.addEventListener('mouseleave', () => { isHovering = false; });
  
      sliderContainer.addEventListener('wheel', (e) => {
        if (!isHovering) return;
        e.preventDefault();
        currentRotation += e.deltaY / scrollSensitivity;
        carousel.style.transform = `rotateY(${currentRotation}deg)`;
      }, { passive: false });
    })();
  
  
    /* 4. SCROLL */
    function changeColorOnScroll() {
      const sections = document.querySelectorAll('section[id^="s-"]');
      const root     = document.documentElement;
  
      const sectionColors = {
        's-home':     { bg: 'var(--palette-black)', text: 'var(--palette-white)' },
        's-about':    { bg: 'var(--palette-black)', text: 'var(--palette-white)' },
        's-projects': { bg: 'var(--palette-black)', text: 'var(--palette-white)' },
        's-skills':   { bg: 'var(--palette-black)', text: 'var(--palette-white)' },
        's-certifs':  { bg: 'var(--palette-black)', text: 'var(--palette-white)' },
      };
  
      sections.forEach((section) => {
        const rect      = section.getBoundingClientRect();
        const sectionId = section.id;
  
        // Section considérée "active" si elle traverse le milieu du viewport
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          const colors = sectionColors[sectionId];
          if (colors) {
            root.style.setProperty('--color-bg-page', colors.bg);
            root.style.setProperty('--color-text-primary', colors.text);
          }
        }
      });
    }
  
    window.addEventListener('scroll', changeColorOnScroll);
    changeColorOnScroll();
  
  });