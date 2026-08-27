/* ==========================================================================
   PORTFOLIO — Morgan Hassouna
   --------------------------------------------------------------------------
   SOMMAIRE
     1. Hero Rainbow
     2. Projects  desktop (card sticky)
     3. Projects  carrousel mobile (.pcard)
     4. Certifications  carrousel 3D (souris + tactile)
     5. Scroll couleur par section
     6. Footer copie de l'email
   ========================================================================== */

   document.addEventListener('DOMContentLoaded', () => {

    /* 1. HERO RAINBOW (nb de couches vient de --rainbow-count) ---------------------------------------------------------------------------*/
    (function initRainbow() {
      const hero  = document.querySelector('.hero');
      const maskH = document.querySelector('.mask-h');
      if (!hero || !maskH) return;
  
      const styles   = getComputedStyle(document.documentElement);
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
  
        div.style.animationDuration = `${animTime - (animTime / count / 2) * i}s`;
        div.style.animationDelay    = `${-(i / count) * animTime}s`;
  
        hero.insertBefore(div, maskH);
      }
    })();
  
  
    /* 2. PROJECTS //desktop (card sticky pilotee par IntersectionObserver) --------------------------------------------------------------*/
    (function initProjectsDesktop() {
      const contents = [
        { title: "Application de gestion locative", description: " " },
        { title: "Labor",                           description: " " },
        { title: "Secura",                          description: " " },
        { title: "My Pokedex",                      description: " " }
      ];
  
      const cards     = document.querySelectorAll('.project-card');
      const titleEl   = document.getElementById('project-title');
      const descEl    = document.getElementById('project-description');
      const contentEl = document.querySelector('.project-card-content');
  
      if (!cards.length || !titleEl || !descEl || !contentEl) return;
  
      titleEl.textContent = contents[0].title;
      descEl.textContent  = contents[0].description;
  
      let currentIndex = 0;
      let fadeTimer = null;
  
      const update = (index) => {
        if (index === currentIndex) return;
  
        clearTimeout(fadeTimer);
        contentEl.classList.add('fade');
  
        fadeTimer = setTimeout(() => {
          titleEl.textContent = contents[index].title;
          descEl.textContent  = contents[index].description;
          contentEl.classList.remove('fade');
          currentIndex = index;
        }, 200);
      };
  

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            update(Array.from(cards).indexOf(entry.target));
          }
        });
      }, {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      });
  
      cards.forEach((card) => observer.observe(card));
    })();
  
  
    /* 3. PROJECTS //carrousel mobile (.pcard) -----------------------------------------------------------------------------------------*/
    (function initProjectsCarousel() {
      const rail = document.querySelector('.projects-carousel');
      if (!rail) return;
  
      // ---- CONTENU PLACEHOLDER ----
      const projects = [
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
  
      projects.forEach((p) => {
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
  
      // Carte centrale detectee par IntersectionObserver (root = le rail,
      // marges laterales de 50% : la zone de detection est une ligne verticale
      // au centre). Remplace l'ancien listener scroll + lectures offsetLeft,
      // qui provoquaient un reflow force a chaque evenement.
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-active', entry.isIntersecting);
        });
      }, {
        root: rail,
        rootMargin: '0px -50% 0px -50%',
        threshold: 0
      });
  
      rail.querySelectorAll('.pcard').forEach((c) => observer.observe(c));
    })();
  
  
    /*4. CERTIFICATIONS carrousel 3D ----------------------------------------------------------------------------------------------------- */
    (function initCertifCarousel() {
      const container = document.querySelector('.slider-container');
      const carousel  = document.querySelector('.carousel');
      if (!container || !carousel) return;
  
      const SENSITIVITY = 0.45;   // degres de rotation par pixel de geste
      const GLIDE_TIME  = 0.6;    // duree approximative de l'inertie, en secondes
      const MIN_SPEED   = 8;      // deg/s — en dessous, l'inertie s'arrete
      const FLICK_SPEED = 90;     // deg/s — vitesse minimale pour lancer l'inertie
      const STALE_MS    = 90;     // ms sans mouvement -> geste considere a l'arret
  
      // ---- SOURCE DE VERITE UNIQUE ----
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
          // lissage exponentiel : evite les pics parasites en fin de geste
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
  
        // geste immobilise avant le relachement => pas d'inertie
        if (performance.now() - lastMoveTime > STALE_MS) velocity = 0;
  
        if (Math.abs(velocity) > FLICK_SPEED) {
          let last = performance.now();
  
          const step = (now) => {
            const dt = Math.min((now - last) / 1000, 0.05);   // borne les gros ecarts
            last = now;
  
            rotation += velocity * dt;
            render();
  
            // decroissance exponentielle calee sur le temps reel,
            // donc identique en 60Hz et en 120Hz
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
  
      // filet de securite : si le navigateur nous reprend la capture
      window.addEventListener('pointerup', endDrag);
      window.addEventListener('pointercancel', endDrag);
      window.addEventListener('blur', () => endDrag(null));
  
      // les <img> sont draggables nativement, ca parasite le geste souris
      container.addEventListener('dragstart', (e) => e.preventDefault());
  
      render();
    })();
  
  
    /*5. SCROLL (changement de couleur du fond pour chaque section) -----------------------------------------------------------------------*/
    (function initScrollColors() {
      const sections = document.querySelectorAll('section[id^="s-"]');
      const root     = document.documentElement;
      if (!sections.length) return;
  
      const sectionColors = {
        's-hero':     { bg: 'var(--palette-black)', text: 'var(--palette-white)' },
        's-about':    { bg: 'var(--palette-black)', text: 'var(--palette-white)' },
        's-projects': { bg: 'var(--palette-black)', text: 'var(--palette-white)' },
        's-skills':   { bg: 'var(--palette-black)', text: 'var(--palette-white)' },
        's-certifs':  { bg: 'var(--palette-black)', text: 'var(--palette-white)' },
      };
  
      let ticking = false;
  
      const apply = () => {
        ticking = false;
        const mid = window.innerHeight / 2;
  
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= mid && rect.bottom >= mid) {
            const colors = sectionColors[section.id];
            if (colors) {
              root.style.setProperty('--color-bg-page', colors.bg);
              root.style.setProperty('--color-text-primary', colors.text);
            }
          }
        });
      };
  
      // throttle par requestAnimationFrame : un seul calcul par frame
      window.addEventListener('scroll', () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(apply);
        }
      }, { passive: true });
  
      apply();
    })();
  
  
    /* 6. FOOTER copie de l'email  --------------------------------------------------------------------------- */
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
        }
      });
    })();
  
  });