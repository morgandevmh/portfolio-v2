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


  /* 2. PROJECTS (desktop : sticky + IntersectionObserver) */

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

  // Mise à jour de la card de droite avec effet fade
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


  /* 3. CAROUSEL (desktop : molette) */
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

}); // ===== FIN DU DOMContentLoaded PRINCIPAL =====


/* BLOCS RESPONSIVE  */

/* RESPONSIVE  Projects : carrousel mobile (≤600px) */
document.addEventListener('DOMContentLoaded', () => {
  const rail = document.querySelector('.projects-carousel');
  if (!rail) return;

  // ---- CONTENU PLACEHOLDER  ----
  const projectsData = [
    { name: "Gestion locative", domain: "FULL-STACK", stack: "React · Node · Mongo",
      url: "#", color: "linear-gradient(150deg,#0f6e56,#0b2f28)",
      desc: "Placeholder — courte description à remplacer." },
    { name: "Labor", domain: "FRONT-END", stack: "Next.js · Tailwind",
      url: "#", color: "linear-gradient(150deg,#993c1d,#38180d)",
      desc: "Placeholder — courte description à remplacer." },
    { name: "Secura", domain: "FULL-STACK", stack: "React · Postgres · Prisma",
      url: "#", color: "linear-gradient(150deg,#185fa5,#0b2740)",
      desc: "Placeholder — courte description à remplacer." },
    { name: "My Pokedex", domain: "API", stack: "JavaScript · REST",
      url: "#", color: "linear-gradient(150deg,#993556,#3c1420)",
      desc: "Placeholder — courte description à remplacer." }
  ];

  const linkIcon = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>';

  projectsData.forEach((p) => {
    const card = document.createElement('article');
    card.className = 'pcard';
    card.innerHTML = `
      <div class="pcard-img" style="background:${p.color}"></div>
      <div class="pcard-body">
        <span class="pcard-domain">${p.domain}</span>
        <h3 class="pcard-name">${p.name}</h3>
        <span class="pcard-stack">${p.stack}</span>
        <div class="pcard-footer">
          <a class="pcard-link" href="${p.url}" target="_blank" rel="noopener">${linkIcon} projet</a>
          <button class="pcard-more" aria-label="Voir la description">+</button>
        </div>
      </div>
      <div class="pcard-panel">
        <h3 class="pcard-panel-name">${p.name}</h3>
        <p class="pcard-desc">${p.desc}</p>
        <button class="pcard-less" aria-label="Fermer">&minus;</button>
      </div>`;

    const panel = card.querySelector('.pcard-panel');
    card.querySelector('.pcard-more').addEventListener('click', () => panel.classList.add('is-open'));
    card.querySelector('.pcard-less').addEventListener('click', () => panel.classList.remove('is-open'));
    rail.appendChild(card);
  });

  // Carte centrale = la plus proche du centre du rail
  const cards = Array.from(rail.querySelectorAll('.pcard'));
  function updateFocus() {
    const mid = rail.scrollLeft + rail.clientWidth / 2;
    let best = null, bestDist = Infinity;
    cards.forEach((c) => {
      const center = c.offsetLeft + c.offsetWidth / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) { bestDist = dist; best = c; }
    });
    cards.forEach((c) => c.classList.toggle('is-active', c === best));
  }

  rail.addEventListener('scroll', updateFocus, { passive: true });
  window.addEventListener('resize', updateFocus);
  requestAnimationFrame(updateFocus);
});


/* RESPONSIVE — Certifs : swipe tactile + inertie */
document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.querySelector('.slider-container');
  const carousel        = document.querySelector('.carousel');
  if (!sliderContainer || !carousel) return;

  const sensitivity = 0.6;   // degrés par pixel
  const decay       = 0.94;  // frein de l'inertie (plus proche de 1 = glisse plus longtemps)

  let startX = 0, startY = 0, startRotation = 0, axis = null, dragging = false;
  let rotation = 0, lastRotation = 0, velocity = 0, momentumId = null;

  const currentY = () => {
    const m = carousel.style.transform.match(/rotateY\(([-0-9.]+)deg\)/);
    return m ? parseFloat(m[1]) : 0;
  };
  const apply = (r) => { rotation = r; carousel.style.transform = `rotateY(${r}deg)`; };

  sliderContainer.addEventListener('touchstart', (e) => {
    dragging = true;
    axis = null;
    if (momentumId) { cancelAnimationFrame(momentumId); momentumId = null; } // coupe l'inertie en cours
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startRotation = currentY();
    lastRotation = startRotation;
    velocity = 0;
  }, { passive: true });

  sliderContainer.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;

    if (axis === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    }
    if (axis === 'x') {
      e.preventDefault();
      const r = startRotation + dx * sensitivity;
      velocity = r - lastRotation;   // vitesse instantanée du geste
      lastRotation = r;
      apply(r);
    }
  }, { passive: false });

  sliderContainer.addEventListener('touchend', () => {
    dragging = false;
    if (axis === 'x' && Math.abs(velocity) > 0.2) {
      const step = () => {
        rotation += velocity;
        carousel.style.transform = `rotateY(${rotation}deg)`;
        velocity *= decay;
        momentumId = (Math.abs(velocity) > 0.05) ? requestAnimationFrame(step) : null;
      };
      momentumId = requestAnimationFrame(step);
    }
  });
});
  