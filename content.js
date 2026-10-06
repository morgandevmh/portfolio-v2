/* ==========================================================================
   PORTFOLIO : Morgan Hassouna
   DICTIONNAIRE i18n
   --------------------------------------------------------------------------
   Le HTML est la source du contenu francais. Ce fichier sert uniquement a
   la bascule de langue : chaque cle correspond a un data-i18n du HTML.

   REGLE : toute modification d'un texte FR dans le HTML doit etre reportee
   ici. Si les deux divergent, le texte change apres un aller-retour FR > EN.

   Cles plates en notation pointee, resolues telles quelles (pas de parcours
   d'objet). Une cle absente laisse le texte en place (voir i18n.js).

   LIMITE DES DESCRIPTIONS PROJETS : 780 caracteres maximum par projet
   (<projet>.p1 + .p2 + .p3 cumules, espaces compris), dans chaque langue.
   Au-dela, le bas du texte est coupe sur desktop. Detail dans styles.css,
   section 6, commentaire au-dessus de .project-panel.
   ========================================================================== */

   export const DEFAULT_LANG = 'fr';
   export const LANGS = ['fr', 'en'];
   
   export const DICT = {
   
     /* ---------------------------------------------------------------- FR --- */
     fr: {
       /* Meta (appliquees par script, pas par data-i18n) */
       'meta.title':       "Morgan Hassouna · Développeur web junior",
       'meta.description': "Développeur web junior, titre DWWM obtenu en 2026. En recherche d'alternance à Paris, Bordeaux ou Toulouse. Projets en Next.js, React et TypeScript.",
   
       /* Navbar */
       'nav.home':     "Accueil",
       'nav.about':    "À propos",
       'nav.projects': "Projets",
       'nav.skills':   "Skills",
       'nav.langAria': "Changer de langue",
   
       /* Hero */
       'hero.name':   "Morgan Hassouna",
       'hero.role':   "Développeur web junior",
       'hero.status': "En recherche d'alternance",
       'hero.cta':    "me contacter",
   
       /* About */
       'about.heading':  "À propos",
       'about.imageAlt': "Portrait de Morgan Hassouna",
       'about.p1': "Des études en droit, puis en langues étrangères et plusieurs années de travail alimentaire, rien dans quoi vraiment me projeter. La programmation, je l'ai croisée par hasard, en suivant des cours gratuits et des vidéos. J'ai vite accroché, et je me suis inscrit à une formation.",
       'about.p2': "Titre professionnel Développeur Web et Web Mobile obtenu en juin 2026. Je cherche maintenant une alternance pour enchaîner sur le titre Concepteur Développeur d'Applications et surtout pour travailler aux côtés de gens du métier, ce qui compte le plus à mes yeux à ce stade.",
       'about.p3': "Le front-end est ce qui me parle le plus pour l'instant, sans que ce soit une frontière : le back m'intéresse de plus en plus, et je ne m'interdis pas de découvrir autre chose que le web.",
   
       /* Projets : interface */
       'projects.heading':    "Projets",
       'projects.source':     "Code source",
       'projects.view':       "Voir le projet",
       'projects.readMore':   "En savoir plus",
       'projects.close':      "Fermer",
       'projects.ariaOpen':   "Voir la description",
       'projects.ariaClose':  "Fermer la description",
   
       /* Projets : AGL */
       'agl.name':    "AGL",
       'agl.status':  "MVP terminé",
       'agl.imgAlt':  "Capture de l'application AGL",
       'agl.summary': "Application de gestion locative full-stack : biens, locataires, baux et génération automatique de contrats PDF. Projet de certification DWWM.",
       'agl.p1': "AGL répond à un besoin observé autour de moi : des propriétaires qui jonglent entre tableurs, mails et documents papier. L'application centralise biens, locataires et informations administratives, et génère automatiquement les baux en PDF, l'étape que les bailleurs jugeaient la plus pénible.",
       'agl.p2': "C'est cette génération qui m'a demandé le plus de travail : transformer les données (dates, montants, loyer total, lieu de signature), les fusionner dans un template, puis produire et stocker le PDF. La fonctionnalité est découpée en quatre modules orchestrés par une seule route.",
       'agl.p3': "Projet mené seul de bout en bout, avec un workflow calqué sur un travail d'équipe : milestones, branches, Pull Requests. Le MVP a validé mon titre DWWM en juin 2026.",
   
       /* Projets : Labor */
       'labor.name':    "Labor",
       'labor.status':  "Projet de groupe · Stage arrêté",
       'labor.imgAlt':  "Capture de la plateforme Labor",
       'labor.summary': "Plateforme de mise en relation entre agriculteurs et travailleurs saisonniers. Projet de groupe réalisé en stage, où j'étais lead front.",
       'labor.p1': "Labor est un projet de groupe réalisé dans le cadre d'un stage de deux mois à but pédagogique. L'idée était une plateforme de mise en relation des agriculteurs et des travailleurs saisonniers, en s'adressant à l'ensemble de l'espace francophone.",
       'labor.p2': "J'ai été chargé d'être le lead front dans ce projet, à la suite de quoi j'ai posé l'identité visuelle du projet : logo et charte graphique v1, utilisée comme référence par l'équipe. Côté code, j'ai défini l'architecture front, les conventions et le design system en tokens CSS, puis développé une partie des tickets : routing, mocks MSW, composants, layouts et landing page.",
       'labor.p3': "Le projet s'est arrêté à la fin du stage, aux deux tiers du MVP maquetté.",
   
       /* Projets : Portfolio */
       'portfolio.name':    "Portfolio",
       'portfolio.status':  "En évolution",
       'portfolio.imgAlt':  "Capture de ce portfolio",
       'portfolio.summary': "Portfolio personnel en HTML, CSS et JavaScript vanilla. Vitrine de mon travail autant que terrain d'expérimentation.",
       'portfolio.p1': "Ce site présente mes projets et en est un lui-même : le code est public, et c'est là que j'expérimente en CSS et JavaScript natifs.",
       'portfolio.p2': "J'ai choisi de l'écrire sans framework. Pour une page vitrine, HTML, CSS et JavaScript me suffisaient, et travailler sans couche d'abstraction m'oblige à comprendre ce que je manipule. Avec AGL, ce sont les deux projets de ma première année que je compte faire vivre : l'un pour apprendre un écosystème complet, l'autre pour revenir aux fondamentaux.",
       'portfolio.p3': "Je l'envisage comme une vitrine amenée à évoluer au fil de mes envies de tester de nouvelles choses. Le code est organisé dans cet esprit : styles centralisés en variables CSS, et un JavaScript découpé en modules autonomes, chacun se désactivant proprement si la section qu'il pilote n'est pas là.",
   
       /* Skills */
       'skills.heading':    "Skills",
       'skills.practiced':  "Utilisées en projet",
       'skills.learning':   "En cours d'apprentissage",
   
       /* Footer */
       'notfound.text': "Cette page n'existe pas, ou n'existe plus.",
       'notfound.back': "Retour à l'accueil",
   
       'footer.cta':      "Une alternance à proposer, ou simplement une question ? Écrivez-moi.",
       'footer.label':    "Me contacter",
       'footer.copy':     "copier",
       'footer.copied':   "copié",
       'footer.ariaCopy': "Copier l'adresse email",
       'footer.cv':       "Télécharger mon CV"
     },
   
     /* ---------------------------------------------------------------- EN --- */
     en: {
       'meta.title':       "Morgan Hassouna · Junior web developer",
       'meta.description': "Junior web developer, DWWM certification earned in 2026. Looking for an apprenticeship in Paris, Bordeaux or Toulouse. Projects in Next.js, React and TypeScript.",
   
       'nav.home':     "Home",
       'nav.about':    "About",
       'nav.projects': "Projects",
       'nav.skills':   "Skills",
       'nav.langAria': "Switch language",
   
       'hero.name':   "Morgan Hassouna",
       'hero.role':   "Junior web developer",
       'hero.status': "Looking for an apprenticeship",
       'hero.cta':    "get in touch",
   
       'about.heading':  "About",
       'about.imageAlt': "Portrait of Morgan Hassouna",
       'about.p1': "After studying law, then foreign languages, and a few years of jobs taken to pay the bills, nothing I could really see myself in. I came across programming by chance, through free online courses and videos. It clicked quickly, and I enrolled on a course.",
       'about.p2': "I earned my DWWM professional certification in web and mobile development in June 2026. I'm now looking for an apprenticeship to go on to the CDA qualification in application design and development, and above all to work alongside people who do this for a living, which matters most to me at this stage.",
       'about.p3': "Front-end is what appeals to me most right now, though not as a boundary: back-end interests me more and more, and I'm not ruling out anything beyond the web.",
   
       'projects.heading':   "Projects",
       'projects.source':    "Source code",
       'projects.view':      "View project",
       'projects.readMore':  "Read more",
       'projects.close':     "Close",
       'projects.ariaOpen':  "Show description",
       'projects.ariaClose': "Close description",
   
       'agl.name':    "AGL",
       'agl.status':  "MVP complete",
       'agl.imgAlt':  "Screenshot of the AGL app",
       'agl.summary': "Full-stack property management app: properties, tenants, leases and automatic PDF contract generation. Built for my DWWM certification.",
       'agl.p1': "AGL answers a need I observed around me: landlords juggling spreadsheets, emails and paper documents. The app centralises properties, tenants and administrative details, and automatically generates leases as PDFs, the step the landlords I spoke to found most tedious.",
       'agl.p2': "That generation step took the most work: reshaping the data (dates, amounts, total rent, signing location), merging it into a template, then producing and storing the PDF. The feature is split into four modules orchestrated by a single route.",
       'agl.p3': "Built entirely on my own, with a workflow modelled on team practice: milestones, branches, pull requests. The MVP earned my DWWM certification in June 2026.",
   
       'labor.name':    "Labor",
       'labor.status':  "Group project · Internship stopped",
       'labor.imgAlt':  "Screenshot of the Labor platform",
       'labor.summary': "Platform connecting farmers with seasonal agricultural workers. Group project built during an internship, where I was front-end lead.",
       'labor.p1': "Labor is a group project built during a two-month educational internship. The idea was a platform connecting farmers with seasonal agricultural workers, aimed at the French-speaking world as a whole.",
       'labor.p2': "I was put in charge as front-end lead, and from there I set the project's visual identity: the logo and a first version of the style guide, used as the team's reference. On the code side, I defined the front-end architecture, the conventions and the CSS-token design system, then built a share of the tickets: routing, MSW mocks, components, layouts and the landing page.",
       'labor.p3': "The project stopped when the internship ended, roughly two thirds into the wireframed MVP.",
   
       'portfolio.name':    "Portfolio",
       'portfolio.status':  "Evolving",
       'portfolio.imgAlt':  "Screenshot of this portfolio",
       'portfolio.summary': "Personal portfolio in vanilla HTML, CSS and JavaScript. A showcase of my work as much as a testing ground.",
       'portfolio.p1': "This site presents my projects and is one of them: the code is public, and it's where I experiment with plain CSS and JavaScript.",
       'portfolio.p2': "I chose to build it without a framework. For a showcase page, HTML, CSS and JavaScript were enough, and working without a layer of abstraction forces me to understand what I'm handling. Along with AGL, these are the two projects from my first year that I intend to keep alive: one to learn a full ecosystem, the other to go back to fundamentals.",
       'portfolio.p3': "I think of it as a showcase meant to change as I feel like testing new things. The code is organised with that in mind: styles centralised in CSS variables, and JavaScript split into self-contained modules, each one bowing out cleanly if the section it drives isn't there.",
   
       'skills.heading':   "Skills",
       'skills.practiced': "Used in projects",
       'skills.learning':  "Currently learning",
   
       'notfound.text': "This page doesn't exist, or no longer does.",
       'notfound.back': "Back to home",
   
       'footer.cta':      "An apprenticeship to offer, or just a question? Get in touch.",
       'footer.label':    "Get in touch",
       'footer.copy':     "copy",
       'footer.copied':   "copied",
       'footer.ariaCopy': "Copy email address",
       'footer.cv':       "Download my CV"
     }
   };