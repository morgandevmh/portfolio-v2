/* ==========================================================================
   PORTFOLIO : Morgan Hassouna
   --------------------------------------------------------------------------
   SOMMAIRE
     1. Hero Rainbow
     2. Projects desktop (bascule des panneaux au scroll)
     3. Projects mobile (carrousel .pcard)
     4. Scroll couleur par section
     5. Footer copie de l'email
     6. Skills : vagues en arriere-plan
   ========================================================================== */

   import { initI18n, t } from './i18n.js';

   // Lance avant DOMContentLoaded : un script module s'execute une fois le HTML
   // analyse, le DOM est donc pret. Plus tot la langue est appliquee, plus court
   // est l'instant ou le francais s'affiche avant la bascule en anglais.
   initI18n();
   
   document.addEventListener('DOMContentLoaded', () => {
   
     /* 1. HERO RAINBOW (nb de couches vient de --rainbow-count) ---------------------------------------------------------------- */
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
   
   
     /* 2. PROJECTS desktop ------------------------------------------------------------------------------------------------------
        Les 3 panneaux sont dans le HTML. Quand une card de gauche croise
        la ligne mediane horizontale de l'ecran, on active le panneau qui porte
        le meme data-project. Aucun texte n'est ecrit par le JS.
        ------------------------------------------------------------------------------------------------------------------------- */
     (function initProjectsDesktop() {
       const cards  = document.querySelectorAll('.project-card[data-project]');
       const panels = document.querySelectorAll('.project-panel[data-project]');
       if (!cards.length || !panels.length) return;
   
       const show = (id) => {
         panels.forEach((panel) => {
           panel.classList.toggle('is-active', panel.dataset.project === id);
         });
       };
   
       const observer = new IntersectionObserver((entries) => {
         entries.forEach((entry) => {
           if (entry.isIntersecting) show(entry.target.dataset.project);
         });
       }, {
         rootMargin: '-50% 0px -50% 0px',   // zone de detection = ligne mediane
         threshold: 0
       });
   
       cards.forEach((card) => observer.observe(card));
     })();
   
   
     /* 3. PROJECTS mobile -------------------------------------------------------------------------------------------------------
        Les cartes existent deja dans le HTML : plus de generation.
        On branche les boutons +/- et on detecte la carte centrale.
        ------------------------------------------------------------------------------------------------------------------------- */
     (function initProjectsCarousel() {
       const rail = document.querySelector('.projects-carousel');
       if (!rail) return;
   
       const cards = rail.querySelectorAll('.pcard');
       if (!cards.length) return;
   
       cards.forEach((card) => {
         const panel = card.querySelector('.pcard-panel');
         if (!panel) return;
         card.querySelector('.pcard-more')?.addEventListener('click', () => panel.classList.add('is-open'));
         card.querySelector('.pcard-less')?.addEventListener('click', () => panel.classList.remove('is-open'));
       });
   
       // Carte centrale : root = le rail, zone de detection = ligne verticale au centre
       const observer = new IntersectionObserver((entries) => {
         entries.forEach((entry) => {
           entry.target.classList.toggle('is-active', entry.isIntersecting);
         });
       }, {
         root: rail,
         rootMargin: '0px -50% 0px -50%',
         threshold: 0
       });
   
       cards.forEach((card) => observer.observe(card));
     })();
   
   
     /* 4. SCROLL (changement de couleur du fond pour chaque section) ----------------------------------------------------------
        NOTE : toutes les couleurs sont identiques, ce module n'a aucun effet
        visible. A implementer ou supprimer (roadmap, etape 15).
        ------------------------------------------------------------------------------------------------------------------------- */
     (function initScrollColors() {
       const sections = document.querySelectorAll('section[id^="s-"]');
       const root     = document.documentElement;
       if (!sections.length) return;
   
       const sectionColors = {
         's-hero':     { bg: 'var(--palette-black)', text: 'var(--palette-white)' },
         's-about':    { bg: 'var(--palette-black)', text: 'var(--palette-white)' },
         's-projects': { bg: 'var(--palette-black)', text: 'var(--palette-white)' },
         's-skills':   { bg: 'var(--palette-black)', text: 'var(--palette-white)' },
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
   
   
     /* 5. FOOTER copie de l'email -----------------------------------------------------------------------------------------------
        Libelles "copie / copier" lus dans le dictionnaire de la langue
        courante. Le texte de retour est relu au moment du retour : si la langue
        change pendant les 1,6 s, le bouton revient dans la bonne langue.
        ------------------------------------------------------------------------------------------------------------------------- */
     (function initCopyMail() {
       const btn = document.querySelector('.footer-copy');
       if (!btn || !navigator.clipboard) return;
   
       let timer = null;
   
       btn.addEventListener('click', async () => {
         try {
           await navigator.clipboard.writeText(btn.dataset.mail);
           clearTimeout(timer);
           btn.textContent = t('footer.copied') ?? 'copied';
           timer = setTimeout(() => {
             btn.textContent = t('footer.copy') ?? 'copy';
           }, 1600);
         } catch (_) {
           // echec silencieux : l'adresse reste visible et selectionnable
         }
       });
     })();
   
   
     /* 6. SKILLS vagues en arriere-plan -------------------------------------------------------------------------------------------
        Reglages lus dans les variables CSS --waves-* (styles.css, section 1).
        L'animation ne tourne que quand la section est visible a l'ecran.
        Reduction des mouvements activee : une seule image fixe est dessinee.
        ------------------------------------------------------------------------------------------------------------------------- */
     (function initSkillsWaves() {
       const section = document.getElementById('s-skills');
       const canvas  = section?.querySelector('.skills-waves');
       const ctx     = canvas?.getContext('2d');
       if (!section || !canvas || !ctx) return;
   
       const styles = getComputedStyle(document.documentElement);
       const read = (name, fallback) => {
         const value = parseFloat(styles.getPropertyValue(name));
         return Number.isFinite(value) ? value : fallback;
       };
   
       const count     = Math.max(1, Math.round(read('--waves-count', 6)));
       const amplitude = read('--waves-amplitude', 1);
       const speed     = read('--waves-speed', 0.5);
       const opacity   = read('--waves-opacity', 0.4);
       const colors    = ['--color-rainbow-1', '--color-rainbow-2', '--color-rainbow-3']
         .map((name) => styles.getPropertyValue(name).trim());
   
       const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   
       // Chaque ligne a sa frequence, son sens, sa phase et sa "respiration"
       // d'amplitude : valeurs derivees de l'index, donc stables d'un chargement a l'autre.
       const waves = Array.from({ length: count }, (_, i) => ({
         freq:    1.2 + i * 0.55 + (i % 2) * 0.3,          // ondulations sur la largeur
         drift:   (0.35 + ((i * 37) % 10) / 14) * (i % 2 ? -1 : 1),
         phase:   i * 1.7,
         breathe: 0.25 + ((i * 53) % 10) / 30,             // vitesse de variation d'amplitude
         color:   colors[i % colors.length],
       }));
   
       let width = 0, height = 0, time = 0, last = 0, rafId = null;
   
       const draw = () => {
         ctx.clearRect(0, 0, width, height);
         const mid = height / 2;
         const maxAmp = height * 0.45 * amplitude;
   
         ctx.lineWidth   = 1.5;
         ctx.globalAlpha = opacity;
   
         waves.forEach((w) => {
           const pulse = 0.55 + 0.45 * Math.sin(time * w.breathe + w.phase);
           ctx.beginPath();
           for (let x = 0; x <= width; x += 4) {
             const u = x / width;
             const envelope = Math.pow(Math.sin(Math.PI * u), 1.6);   // resserre aux extremites
             const y = mid + maxAmp * pulse * envelope
                     * Math.sin(u * Math.PI * 2 * w.freq + time * w.drift * 2 + w.phase);
             if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
           }
           ctx.strokeStyle = w.color;
           ctx.stroke();
         });
       };
   
       const resize = () => {
         const dpr = window.devicePixelRatio || 1;
         width  = section.clientWidth;
         height = section.clientHeight;
         canvas.width  = Math.round(width * dpr);
         canvas.height = Math.round(height * dpr);
         ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
         draw();
       };
   
       const frame = (now) => {
         const dt = Math.min((now - last) / 1000, 0.05);   // borne les gros ecarts (onglet en arriere-plan)
         last = now;
         time += dt * speed;
         draw();
         rafId = requestAnimationFrame(frame);
       };
   
       const start = () => {
         if (rafId || reduced) return;
         last = performance.now();
         rafId = requestAnimationFrame(frame);
       };
   
       const stop = () => {
         if (rafId) cancelAnimationFrame(rafId);
         rafId = null;
       };
   
       new ResizeObserver(resize).observe(section);
       new IntersectionObserver(([entry]) => {
         if (entry.isIntersecting) start(); else stop();
       }).observe(section);
     })();
   
   });