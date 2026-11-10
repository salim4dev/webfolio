
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { projects } from './data/projects.js';

const iconPaths = {
  ArrowDown: <><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></>,
  ArrowRight: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
  ArrowUpRight: <><path d="M7 17 17 7"/><path d="M7 7h10v10"/></>,
  Code2: <><path d="m8 17-5-5 5-5"/><path d="m16 7 5 5-5 5"/><path d="m14 4-4 16"/></>,
  Github: <><path d="M9 19c-4 1-4-2-6-2"/><path d="M15 21v-3.5c0-1 .1-1.5-.5-2 3.3-.4 6.5-1.6 6.5-7A5.4 5.4 0 0 0 19.5 5 5 5 0 0 0 19.4 1S18 0 15 2a13 13 0 0 0-6 0C6 0 4.6 1 4.6 1A5 5 0 0 0 4.5 5 5.4 5.4 0 0 0 3 8.5c0 5.4 3.2 6.6 6.5 7-.6.5-.5 1.2-.5 2V21"/></>,
  Menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>, X: <><path d="m18 6-12 12M6 6l12 12"/></>,
  Sparkles: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z"/></>,
  Smartphone: <><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/></>, Globe: <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></>,
  Layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></>, Mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  Check: <path d="m5 12 4 4L19 6"/>, Terminal: <><path d="m4 17 6-5-6-5M12 19h8"/></>,

Server: <>
  <rect x="2" y="3" width="20" height="8" rx="2"/>
  <rect x="2" y="13" width="20" height="8" rx="2"/>
  <path d="M6 7h.01M6 17h.01"/>
</>,

Palette: <>
  <path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1.7-3.1 2 2 0 0 1 1.7-3.1H18a3 3 0 0 0 3-3c0-4.9-4-8.8-9-8.8Z"/>
  <circle cx="7.5" cy="10" r=".8"/>
  <circle cx="11" cy="7" r=".8"/>
  <circle cx="15" cy="8" r=".8"/>
</>,

Rocket: <>
  <path d="M4.5 16.5c-1.5 1.3-2 4-2 4s2.7-.5 4-2"/>
  <path d="M12 15l-3-3a20 20 0 0 1 8-9c2-1 5-1 5-1s0 3-1 5a20 20 0 0 1-9 8Z"/>
  <path d="M9 12H5l-2 4h5M12 15v4l4 2 4-4v-4"/>
  <circle cx="16" cy="8" r="2"/>
</>
};


function IconBase({ name, size = 20, ...props }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{iconPaths[name]}</svg>; }

const ArrowDown = (props) => <IconBase name="ArrowDown" {...props} />;
const ArrowRight = (props) => <IconBase name="ArrowRight" {...props} />;
const ArrowUpRight = (props) => <IconBase name="ArrowUpRight" {...props} />;
const Code2 = (props) => <IconBase name="Code2" {...props} />;
const Github = (props) => <IconBase name="Github" {...props} />;
const Menu = (props) => <IconBase name="Menu" {...props} />;
const X = (props) => <IconBase name="X" {...props} />;
const Sparkles = (props) => <IconBase name="Sparkles" {...props} />;
const Smartphone = (props) => <IconBase name="Smartphone" {...props} />;
const Globe = (props) => <IconBase name="Globe" {...props} />;
const Layers = (props) => <IconBase name="Layers" {...props} />;
const Mail = (props) => <IconBase name="Mail" {...props} />;
const Check = (props) => <IconBase name="Check" {...props} />;
const Terminal = (props) => <IconBase name="Terminal" {...props} />;

const Server = (props) => <IconBase name="Server" {...props} />;
const Palette = (props) => <IconBase name="Palette" {...props} />;
const Rocket = (props) => <IconBase name="Rocket" {...props} />;


const nav = [['Accueil','home'],['À propos','about'],['Compétences','skills'],['Services','services'],['Projets','projects'],['Contact','contact']];
const rise = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: .6, ease: 'easeOut' } } };

function SectionTitle({ eyebrow, title, text }) { return <motion.div className="section-heading" variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }}><span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</motion.div>; }



function CountUp({ end, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = counterRef.current;

    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );
      
      // compteur accelere au depart
      //const easedProgress = 1 - Math.pow(1 - progress, 3);

      //progression constante
      const easedProgress = progress;

      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [started, end, duration]);

  return (
  <span ref={counterRef} className="count-up">
    {count}{suffix}
  </span>
);
}



const skillCategories = [
  {
    title: "Front-end",
    Icon: Code2,
    technologies: [
      { name: "HTML5", logo:  "/icons/html-icon.svg", local: true },
      { name: "CSS3", logo: "/icons/css-icon.svg", local: true },
      { name: "JavaScript", logo: "javascript" },
      { name: "React", logo: "react" },
    ],
  },
  {
    title: "Back-end",
    Icon: Server,
    technologies: [
      { name: "Node.js", logo: "nodedotjs" },
      { name: "Python", logo: "/icons/python-icon.svg", local: true  },
      { name: "MySQL", logo: "/icons/mysql-icon.svg", local: true  },
      { name: "Supabase", logo: "/icons/supabase-icon.svg", local: true },
    ],
  },
  {
    title: "Mobile",
    Icon: Smartphone,
    technologies: [
      { name: "Android", logo:  "/icons/android-robot-bot-icon.svg", local: true  },
      { name: "React Native", logo: "react" },
      { name: "Flutter", logo:  "/icons/flutter-icon.svg", local: true },
    ],
  },
  {
    title: "UI/UX Design",
    Icon: Palette,
    technologies: [
      { name: "Canva", logo: "/icons/canva-icon.svg", local: true },
      { name: "Photoshop", logo: "/icons/adobe-photoshop-icon.svg", local: true },
      { name: "Figma", logo: "/icons/figma-icon.svg", local: true },
    ],
  },
  {
    title: "Déploiement",
    Icon: Rocket,
    technologies: [
      { name: "GitHub", logo: "/icons/github-icon.svg", local: true },
      { name: "Render", logo: "render" },
      { name: "InfinityFree", logo:  "/icons/if.png", local: true },
      { name: "Neon", logo:  "/icons/neon.png", local: true },
    ],
  },
];

function SkillCard({ category }) {
  const { title, Icon, technologies } = category;

  return (
    <div className="skill-card">
      <div className="skill-card-heading">
        <span className="skill-card-icon">
          <Icon size={19} />
        </span>
        <h3>{title}</h3>
      </div>

      <div className="skill-logos">
        {technologies.map((tech) => (
          <div className="skill-logo-item" key={tech.name}>
            {tech.logo ? (
              <img
  src={tech.local ? tech.logo : `https://cdn.simpleicons.org/${tech.logo}`}
  alt={`${tech.name} logo`}
  loading="lazy"
/>
            ) : (
              <span className="skill-text-logo">IF</span>
            )}

            <span>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="skills-section">
      <SectionTitle
  eyebrow="Mon savoir-faire"
  title="Mes compétences"
  text="Les technologies et outils que j'utilise pour concevoir et développer mes projets."
/>

      <div className="skills-grid">
        {skillCategories.map((category) => (
          <SkillCard
            key={category.title}
            category={category}
          />
        ))}
      </div>
    </section>
  );
}


export default function AppFR({ onLanguageChange })  {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('FR');
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState('Tous');
  const filters = ['Tous', 'Web', 'App', 'Full-stack'];
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      let current = 'home';
      for (const [, id] of nav) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= 150) current = id; }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const shown = filter === 'Tous' ? projects : projects.filter(p => p.types?.includes(filter));
  return <>
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="brand" href="#home" onClick={() => setMenuOpen(false)}><span className="brand-mark"><Code2 size={19}/></span><span>Salim<span className="brand-accent">4DEV</span><small>.portfolio</small></span></a>
      <nav className={menuOpen ? 'nav-open' : ''}>{nav.map(([label,id]) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`} onClick={() => setMenuOpen(false)}>{lang === 'FR' ? label : ({'Accueil':'Home','À propos':'About','Compétences':'Skills','Projets':'Projects','Services':'Services','Contact':'Contact'}[label])}</a>)}</nav>
      <div className="header-right">
        <div className="header-socials"><a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a><a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><span className="linkedin-mark">in</span></a></div>
        <div className="language-switch" aria-label="Language">

          <button onClick={() => onLanguageChange('FR')}>FR</button>
          <span>/</span>
          <button onClick={() => onLanguageChange('EN')}>EN</button>
          
         
          </div>
        <button className="menu-toggle" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      </div>
    </header>
    <main>
      <section id="home" className="hero section-wrap">
        <div className="hero-grid" aria-hidden="true"><span/><span/><span/><span/><span/><span/></div>
        <div className="hero-copy">
          <motion.div className="availability" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}><span className="status-dot"/> {lang === 'FR' ? 'Disponible pour de nouveaux projets' : 'Available for new projects'}</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18, duration: .7 }}>{lang === 'FR' ? <>Je transforme les idées<br/>en <span className="gradient-text">expériences digitales</span></> : <>I turn ideas into<br/><span className="gradient-text">digital experiences</span></>}<span className="hero-period">.</span></motion.h1>
          <motion.p className="hero-lead" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 }}>{lang === 'FR' ? 'Des expériences pensées pour captiver, simplifier le quotidien et transformer chaque interaction en quelque chose de mémorable.' : 'Web & App Developer. I build polished interfaces and useful, high-performance applications designed around the people who use them.'}</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4 }}><a className="button button-primary" href="#projects">{lang === 'FR' ? 'Explorer mes projets' : 'Explore my work'} <ArrowRight size={17}/></a><a className="button button-ghost" href="#contact">{lang === 'FR' ? 'Me contacter' : 'Get in touch'} <ArrowUpRight size={16}/></a></motion.div>
          <motion.div className="hero-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 }}><span><span className="meta-line"/> Web · Mobile · Full-stack</span><span className="hero-location">Basé en France · Disponible à distance</span></motion.div>
        </div>
        <motion.div
  className="hero-visual"
  initial={{ opacity: 0, scale: 0.94, y: 15 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.8 }}
>
  <img
    src="/developer-hero.png"
    alt="Développeur travaillant sur plusieurs écrans de code"
  />
</motion.div>
        <a className="scroll-cue" href="#about"><span>Défiler pour découvrir</span><ArrowDown size={15}/></a>
      </section>
      <section id="about" className="section section-wrap about-section">

  {/* COLONNE GAUCHE : PRÉSENTATION */}
  <div className="about-intro">
    <span className="eyebrow">
      <span className="eyebrow-dot" />
      À PROPOS DE MOI
    </span>

    <h2>
      Du code, du sens
      <br />
      et une attention
      <br />
      aux <span className="gradient-text">détails.</span>
    </h2>

    <p className="about-description">
      Moi, c'est <span className="gradient-text">Salim, </span>
      développeur Web & App junior, animé par la curiosité, la créativité et l'envie de bien faire.
      <br /><br />
      J'aime transformer des idées en projets concrets, explorer de
      nouvelles technologies et relever des défis techniques.
      Chaque projet est pour moi une occasion d'apprendre,
      de progresser et de créer quelque chose d'utile.
    </p>
  </div>

  {/* COLONNE DROITE : CHIFFRES ET MÉTHODE */}
  <div className="about-details">

    <motion.div
      className="stats-panel"
      variants={rise}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
     <div className="about-panel-heading">
  <span className="panel-icon">
    <Layers size={18} />
  </span>
  <span>Quelques chiffres</span>
</div>

<div className="stats-grid">
  <div className="stat-item">
    <strong>
      <CountUp end={30} suffix="+" />
    </strong>
    <span>Projets réalisés</span>
    <small>Personnels & académiques</small>
  </div>

  <div className="stat-item">
    <strong>
      <CountUp end={15} suffix="+" />
    </strong>
    <span>Technologies</span>
    <small>Explorées et pratiquées</small>
  </div>

  <div className="stat-item">
    <strong>
      <CountUp end={3} />
    </strong>
    <span>Domaines</span>
    <small>Web · Mobile · BackEnd</small>
  </div>
</div>
    </motion.div>

    <motion.div
      className="approach-panel"
      variants={rise}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="about-panel-heading">
        <span className="panel-icon violet">
          <Sparkles size={18} />
        </span>
        <span>Ma méthode de travail</span>
      </div>

      <div className="approach-steps">
        {[
          ["01", "Comprendre", "Analyser le besoin"],
          ["02", "Concevoir", "Imaginer la solution"],
          ["03", "Développer", "Construire et tester"],
          ["04", "Améliorer", "Optimiser le résultat"]
        ].map(([number, title, description]) => (
          <div className="approach-step" key={number}>
            <span className="step-number">{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </motion.div>

  </div>

  {/* QUATRE QUALITÉS : TOUTE LA LARGEUR */}
  <div className="about-highlights">
    {[
      {
        icon: "💡",
        title: "Résolution de problèmes",
        desc: "J'aime analyser les défis et concevoir des solutions efficaces.",
        color: "#38bdf8"
      },
      {
        icon: "🤝",
        title: "Esprit d'équipe",
        desc: "J'apprécie la collaboration, le partage et le travail collectif.",
        color: "#c084fc"
      },
      {
        icon: "🛡️",
        title: "Sens des responsabilités",
        desc: "Je veille à produire un code fiable, propre et sécurisé.",
        color: "#fb7185"
      },
      {
        icon: "⚡",
        title: "Passionné de technologie",
        desc: "Curieux des nouvelles technologies et toujours prêt à apprendre.",
        color: "#a3e635"
      }
    ].map((item, i) => (
      <motion.div
        className="about-highlight"
        key={item.title}
        variants={rise}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: i * 0.08 }}
      >
        <span
          className="highlight-icon"
          style={{ color: item.color }}
        >
          {item.icon}
        </span>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </motion.div>
    ))}
  </div>

</section>


<section id="skills" className="section skills-section">
  <div className="section-wrap">

      <SkillsSection />

 </div>
</section>

<section id="services" className="section services-section">
  <div className="section-wrap">

    <SectionTitle
      eyebrow="Services"
      title="De l'idée au produit en ligne."
      text="Un accompagnement adapté à ton besoin, que tu sois une entreprise, un indépendant ou une équipe produit."
    />

    <div className="services-list">

  {/* SERVICE 01 — DÉVELOPPEMENT SUR MESURE */}
  <motion.article
    className="service-row"
    variants={rise}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="service-visual">
  <img
    src="/images/customdev.jpg"
    alt="Dashboard web et application mobile"
    className="service-image"
  />
</div>

    <div className="service-copy">
      
      <div className="service-heading-icon"><Code2 size={21} /></div>
      <h3>Développement sur mesure</h3>
      <p>Des solutions numériques conçues autour de tes besoins et de tes objectifs.</p>

      <ul className="service-points">
        <li>Applications web SPA et plateformes SaaS</li>
        <li>Tableaux de bord et outils métiers</li>
        <li>Applications mobiles Android</li>
      </ul>

      <a href="#contact" className="service-link">
        Discutons de votre projet <ArrowUpRight size={17} />
      </a>
    </div>
  </motion.article>


  {/* SERVICE 02 — DESIGN UI/UX */}
  <motion.article
    className="service-row reverse"
    variants={rise}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ delay: 0.1 }}
  >
    <div className="service-visual">
      <img
    src="/images/devmobile.png"
    alt="Dashboard web et application mobile"
    className="service-image"
  />
    </div>

    <div className="service-copy">
      
      <div className="service-heading-icon violet"><Palette size={21} /></div>
      <h3>Design UI/UX</h3>
      <p>Des interfaces esthétiques, intuitives et pensées pour offrir une expérience utilisateur fluide.</p>

      <ul className="service-points">
        <li>Conception d'interfaces web et mobiles</li>
        <li>Maquettes et prototypes interactifs</li>
        <li>Responsive design et expérience utilisateur</li>
      </ul>

      <a href="#contact" className="service-link">
        Discutons de votre projet <ArrowUpRight size={17} />
      </a>
    </div>
  </motion.article>


  {/* SERVICE 03 — INTÉGRATION DE SERVICES */}
  <motion.article
    className="service-row"
    variants={rise}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ delay: 0.2 }}
  >
   <div className="service-visual">
      <img
    src="/images/service-integration.png"
    alt="Dashboard web et application mobile"
    className="service-image"
  />
    </div>

    <div className="service-copy">
      
      <div className="service-heading-icon"><Layers size={21} /></div>
      <h3>Intégration de services</h3>
      <p>Connecter les applications aux outils et services nécessaires à leur fonctionnement.</p>

      <ul className="service-points">
        <li>Intégration d'API et de services tiers</li>
        <li>Authentification et gestion des utilisateurs</li>
        <li>Paiements en ligne et abonnements</li>
      </ul>

      <a href="#contact" className="service-link">
        Discutons de votre projet <ArrowUpRight size={17} />
      </a>
    </div>
  </motion.article>


  {/* SERVICE 04 — QUALITÉ, SÉCURITÉ & DÉPLOIEMENT */}
  <motion.article
    className="service-row reverse"
    variants={rise}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ delay: 0.3 }}
  >
    <div className="service-visual">
      <img
    src="/images/deploiement.png"
    alt="Dashboard web et application mobile"
    className="service-image"
  />
    </div>

    <div className="service-copy">
      
      <div className="service-heading-icon violet"><Server size={21} /></div>
      <h3>Qualité, sécurité & déploiement</h3>
      <p>Améliorer la fiabilité, renforcer la sécurité et assurer la mise en production des applications.</p>

      <ul className="service-points">
        <li>Tests, QA et audit de code</li>
        <li>Sécurisation et optimisation des applications</li>
        <li>Migration et déploiement</li>
      </ul>

      <a href="#contact" className="service-link">
        Discutons de votre projet <ArrowUpRight size={17} />
      </a>
    </div>
  </motion.article>

</div>
  </div>
</section>
      
      

<section id="projects" className="section section-wrap">
  <SectionTitle
    eyebrow="Projets sélectionnés"
    title={<>Des idées qui prennent<br />forme dans le réel.</>}
    text="Quelques projets personnels, et professionnel réalisés pour des clients."
  />

  <div className="project-toolbar">
    <div className="filter-list">
      {filters.map(f => (
        <button
          key={f}
          className={filter === f ? 'selected' : ''}
          onClick={() => setFilter(f)}
        >
          {f}
        </button>
      ))}
    </div>
  </div>

  <div className="projects-grid">
    {shown.map((p, i) => (
     <motion.article
  className={`project-card project-${p.tone}`}
  key={p.title}
  layout
  variants={rise}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  transition={{ delay: i * 0.07 }}
>
  <div className="project-art">
    {p.image ? (
      <img
        className="project-image"
        src={p.image}
        alt={`Aperçu de ${p.title}`}
        loading="lazy"
      />
    ) : (
      <>
        <div className="project-art-grid" />
        <div className="mock-browser">
          <div className="mock-top">
            <i /><i /><i />
            <span>workspace.app</span>
          </div>
          <div className="mock-content">
            <div className="mock-sidebar"><b /><i /><i /><i /><i /></div>
            <div className="mock-main">
              <span className="mock-kicker">OVERVIEW</span>
              <b className="mock-title" />
              <div className="mock-stats"><i /><i /><i /></div>
              <div className="mock-chart">
                <span /><span /><span /><span /><span /><span /><span />
              </div>
            </div>
          </div>
        </div>
      </>
    )}
    <span className="project-number">{p.number}</span>
  </div>

  <div className="project-content">
    <div className="project-heading">
      <h3>{p.title}</h3>

      <div className="project-heading-right">
        

        {p.link && (
          <a
            className="project-link"
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Voir le projet ${p.title}`}
          >
            <ArrowUpRight />
          </a>
        )}
      </div>
    </div>

    {p.description && (
      <p className="project-description">{p.description}</p>
    )}

    {p.tags?.length > 0 && (
      <div className="project-tags">
        {p.tags.map(tag => (
          <span className="project-tag" key={tag}>{tag}</span>
        ))}
      </div>
    )}
  </div>
</motion.article>
    ))}
  </div>

  <p className="project-disclaimer">
    <Sparkles size={14} />
    Un de ces projets vous interesse ? Contactez moi !
  </p>
</section>

      
      
<section id="contact" className="section section-wrap">
  <div className="contact-panel">
    <div className="contact-orb" />

    <div className="contact-content">
      <span className="eyebrow">
        <span className="eyebrow-dot" />
        Contact
      </span>

      <h2>
        On construit quelque chose
        <br />
        <span className="gradient-text">de bien ?</span>
      </h2>

      <p>
        Tu recrutes, tu as une idée à concrétiser ou tu veux simplement
        échanger ? Ma boîte mail est ouverte.
      </p>

      <a
        className="button button-primary"
        href="mailto:TON_EMAIL"
      >
        Parlons de ton projet <ArrowUpRight size={17} />
      </a>

      
    </div>

    <div className="contact-decoration">
  <div className="availability-badge">
    <span className="availability-dot" />
    Ouvert aux opportunités
  </div>

  <div className="contact-envelope">
    <div className="envelope-glow" />
    <div className="envelope-back" />

    <div className="envelope-letter">
      <Mail size={34} />
      <span>Let's talk</span>
    </div>

    <div className="envelope-pocket">
      <div className="envelope-fold-left" />
      <div className="envelope-fold-right" />
      <div className="envelope-fold-bottom" />
    </div>

    <div className="envelope-flap" />
  </div>

  <div className="contact-details">
    <a href="mailto:TON_EMAIL" className="contact-detail">
      <Mail size={19} />
      <span>TON_EMAIL</span>
    </a>

    <a href="tel:+33XXXXXXXXX" className="contact-detail">
      <Smartphone size={19} />
      <span>+33 X XX XX XX XX</span>
    </a>
  </div>
</div>
  </div>
</section>
   


    </main>
   <footer className="site-footer">
  <div className="section-wrap footer-inner">
    <a className="brand" href="#home">
      <span className="brand-mark"><Code2 size={18}/></span>
      <span>Salim<span className="brand-accent">4DEV</span></span>
    </a>

    <span className="footer-copy">
      © {new Date().getFullYear()} — Fait avec beacoup de café et quelques bugs.
    </span>

    <div className="social-links">
      <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
        <Github size={17}/>
      </a>
      <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <span className="linkedin-mark">in</span>
      </a>
    </div>
  </div>
</footer>

<a className={`back-top ${scrolled ? 'visible' : ''}`} href="#home" aria-label="Retour en haut">
  <ArrowUpRight size={19}/>
</a>
 
  </>;
}
