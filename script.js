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
  (function initProjects() {
    const projectContents = [
      { title: "Application de gestion locative", description: " " },
      { title: "Labor",                           description: " " },
      { title: "Secura",                          description: " " },
      { title: "My Pokedex",                      description: " " }
    ];

    const projectCards       = document.querySelectorAll('.project-card');
    const projectTitle       = document.getElementById('project-title');
    const projectDescription = document.getElementById('project-description');
    const projectContent     = document.querySelector('.project-card-content');

    if (!projectCards.length || !projectTitle || !projectDescription || !projectContent) return;

    // État initial cohérent : le DOM affiche le projet 0, l'index le sait
    projectTitle.textContent       = projectContents[0].title;
    projectDescription.textContent = projectContents[0].description;

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
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(projectCards).indexOf(entry.target);
          updateProjectCard(index);
        }
      });
    }, {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    });

    projectCards.forEach((card) => projectObserver.observe(card));
  })();


  /* 3. CAROUSEL CERTIFS — module unifié (souris + tactile, comportement identique) */
  (function initCertifCarousel() {
    const container = document.querySelector('.slider-container');
    const carousel  = document.querySelector('.carousel');
    if (!container || !carousel) return;

    const SENSITIVITY = 0.45;   // degrés de rotation par pixel de geste
    const GLIDE_TIME  = 0.6;   // durée approximative de l'inertie, en secondes
    const MIN_SPEED   = 8;     // deg/s — en dessous, l'inertie s'arrête
    const FLICK_SPEED = 90;    // deg/s — vitesse minimale pour lancer l'inertie
    const STALE_MS    = 90;    // ms sans mouvement → geste considéré à l'arrêt

    // ---- SOURCE DE VÉRITÉ UNIQUE ----
    let rotation = 0;

    let dragging = false;
    let pointerId = null;
    let startX = 0, startRotation = 0;
    let lastRotation = 0, velocity = 0, lastMoveTime = 0;
    let momentumId = null;

    const render = () => {
      carousel.style.transform = `rotateY(${rotation}deg)`;
    };

    const stopMomentum = () => {
      if (momentumId) {
        cancelAnimationFrame(momentumId);
        momentumId = null;
      }
    };

    const onPointerDown = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      stopMomentum();

      dragging      = true;
      pointerId     = e.pointerId;
      startX        = e.clientX;
      startRotation = rotation;
      lastRotation  = rotation;
      velocity      = 0;
      lastMoveTime  = performance.now();

      // capture posée immédiatement : le drag survit à la sortie de zone
      try { container.setPointerCapture(e.pointerId); } catch (_) {}
      container.classList.add('is-dragging');
    };

    const onPointerMove = (e) => {
      if (!dragging || e.pointerId !== pointerId) return;

      const now  = performance.now();
      const next = startRotation + (e.clientX - startX) * SENSITIVITY;
      const dt   = (now - lastMoveTime) / 1000;

      if (dt > 0) {
        const instant = (next - lastRotation) / dt;   // deg/s
        // lissage exponentiel : évite les pics parasites en fin de geste
        velocity = velocity * 0.7 + instant * 0.3;
      }

      lastRotation = next;
      lastMoveTime = now;
      rotation     = next;
      render();
    };

    const endDrag = (e) => {
      if (!dragging || (e && e.pointerId !== pointerId)) return;

      dragging = false;
      container.classList.remove('is-dragging');

      if (e && container.hasPointerCapture?.(e.pointerId)) {
        container.releasePointerCapture(e.pointerId);
      }
      pointerId = null;

      // geste immobilisé avant le relâchement → pas d'inertie
      if (performance.now() - lastMoveTime > STALE_MS) velocity = 0;

      if (Math.abs(velocity) > FLICK_SPEED) {
        let last = performance.now();

        const step = (now) => {
          const dt = Math.min((now - last) / 1000, 0.05);  // borne les gros écarts
          last = now;

          rotation += velocity * dt;
          render();

          // décroissance exponentielle calée sur le temps réel
          velocity *= Math.exp(-dt / (GLIDE_TIME / 3));

          momentumId = Math.abs(velocity) > MIN_SPEED
            ? requestAnimationFrame(step)
            : null;
        };
        momentumId = requestAnimationFrame(step);
      }
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', endDrag);
    container.addEventListener('pointercancel', endDrag);

    // filet de sécurité : si le navigateur nous reprend la capture
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
    window.addEventListener('blur', () => endDrag(null));

    // les <img> sont draggables nativement, ça parasite le geste souris
    container.addEventListener('dragstart', (e) => e.preventDefault());

    render();
  })();


  /* 4. SCROLL — changement de couleur par section
     (toutes les sections sont identiques pour l'instant : effet neutre) */
  function changeColorOnScroll() {
    const sections = document.querySelectorAll('section[id^="s-"]');
    const root     = document.documentElement;

    const sectionColors = {
      's-hero':     { bg: 'var(--palette-black)', text: 'var(--palette-white)' },
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


  /* 5. FOOTER — copie de l'email */
  (function initCopyMail() {
    const btn = document.querySelector('.footer-copy');
    if (!btn || !navigator.clipboard) return;

    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.mail);
        const original = btn.textContent;
        btn.textContent = 'copied';
        setTimeout(() => { btn.textContent = original; }, 1600);
      } catch (_) {
        // clipboard indisponible (contexte non sécurisé) : le lien mailto reste actif
      }
    });
  })();

}); 


/* BLOCS RESPONSIVE */

/* RESPONSIVE — Projects : carrousel mobile (≤600px) */
document.addEventListener('DOMContentLoaded', () => {
  const rail = document.querySelector('.projects-carousel');
  if (!rail) return;

  // ---- CONTENU PLACEHOLDER ----
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

  const linkIcon = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>';

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