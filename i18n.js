/* ==========================================================================
   PORTFOLIO — Morgan Hassouna
   i18n — bascule FR / EN
   --------------------------------------------------------------------------
   Ordre de priorite pour la langue au chargement :
     1. parametre d'URL      ?lang=en   (lien envoye a un recruteur)
     2. choix memorise       localStorage (clic sur le toggle)
     3. langue du navigateur navigator.language commencant par "en"
     4. langue par defaut    FR (celle ecrite dans le HTML)

   Le HTML contient le francais. En FR par defaut, le DOM n'est pas touche.
   Une cle absente du dictionnaire laisse le texte existant en place.
   ========================================================================== */

   import { DICT, DEFAULT_LANG, LANGS } from './content.js';

   const STORAGE_KEY = 'portfolio-lang';
   
   // Correspondance attribut data-* -> attribut HTML reel
   const ATTRS = [
     ['data-i18n-alt',        'alt'],
     ['data-i18n-title',      'title'],
     ['data-i18n-aria-label', 'aria-label'],
   ];
   
   let current = DEFAULT_LANG;
   
   
   /* --- API publique ------------------------------------------------------ */
   
   export const getLang = () => current;
   
   /** Traduction d'une cle dans la langue courante, undefined si absente. */
   export const t = (key) => DICT[current]?.[key];
   
   
   /* --- Stockage (try/catch : localStorage peut lever en navigation privee) - */
   
   const readStored = () => {
     try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; }
   };
   
   const store = (lang) => {
     try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) { /* sans effet */ }
   };
   
   
   /* --- Detection --------------------------------------------------------- */
   
   const detect = () => {
     const fromUrl = new URLSearchParams(window.location.search).get('lang');
     if (LANGS.includes(fromUrl)) return fromUrl;
   
     const stored = readStored();
     if (LANGS.includes(stored)) return stored;
   
     const nav = (navigator.languages?.[0] || navigator.language || '').toLowerCase();
     if (nav.startsWith('en')) return 'en';
   
     return DEFAULT_LANG;
   };
   
   
   /* --- URL : reflete la langue courante, sans recharger la page ---------- */
   
   const updateUrl = (lang) => {
     const url = new URL(window.location.href);
     if (lang === DEFAULT_LANG) url.searchParams.delete('lang');
     else url.searchParams.set('lang', lang);
     history.replaceState(null, '', url);
   };
   
   
   /* --- Application au DOM ------------------------------------------------ */
   
   const apply = (lang) => {
     const dict = DICT[lang];
     if (!dict) return;
   
     current = lang;
     document.documentElement.lang = lang;
   
     // Texte
     document.querySelectorAll('[data-i18n]').forEach((el) => {
       const value = dict[el.dataset.i18n];
       if (value !== undefined) el.textContent = value;
     });
   
     // Attributs
     ATTRS.forEach(([dataAttr, attr]) => {
       document.querySelectorAll(`[${dataAttr}]`).forEach((el) => {
         const value = dict[el.getAttribute(dataAttr)];
         if (value !== undefined) el.setAttribute(attr, value);
       });
     });
   
     // Onglet et description
     if (dict['meta.title']) document.title = dict['meta.title'];
     const desc = document.querySelector('meta[name="description"]');
     if (desc && dict['meta.description']) desc.setAttribute('content', dict['meta.description']);
   
     // Etat du toggle
     document.querySelectorAll('.lang-btn[data-lang]').forEach((btn) => {
       const active = btn.dataset.lang === lang;
       btn.classList.toggle('is-active', active);
       btn.setAttribute('aria-pressed', String(active));
     });
   
     // Signal pour les autres modules qui auraient du texte dynamique
     document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
   };
   
   
   /* --- Initialisation ---------------------------------------------------- */
   
   export function initI18n() {
     const buttons = document.querySelectorAll('.lang-btn[data-lang]');
     if (!buttons.length) return;
   
     buttons.forEach((btn) => {
       btn.addEventListener('click', () => {
         const lang = btn.dataset.lang;
         if (lang === current || !LANGS.includes(lang)) return;
         apply(lang);
         store(lang);
         updateUrl(lang);
       });
     });
   
     // En FR, le HTML est deja correct : on ne reecrit rien.
     const initial = detect();
     if (initial !== DEFAULT_LANG) apply(initial);
   }