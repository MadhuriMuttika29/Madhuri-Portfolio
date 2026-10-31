import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowDownRight, ArrowUpRight, Code2, Linkedin, Mail, Menu, MousePointer2, Palette, Sparkles, X } from 'lucide-react';
import { Suspense, useEffect, useRef, useState } from 'react';
import type { Group } from 'three';

const work = [
  { id: '01', type: 'MERCHANT ONBOARDING', title: 'Generic Form Builder', text: 'Build merchant forms by hand or from Excel, then tailor fields, payment amounts, email recipients and branding.', detail: 'A drag-and-drop field palette makes forms configurable. Each form has its own merchant dashboard. Role-based access, JWT, CSRF protection and separate merchant workflows help secure form creation and submissions.', stack: 'Java · Spring Boot · React · MySQL · JWT · CSRF', color: 'lavender', icon: '◈' },
  { id: '02', type: 'PAYMENT QA · TWO GATEWAYS', title: 'Universal Simulator', text: 'Run transactions across both payment gateways and inspect the full request-to-payment journey.', detail: 'The simulator brings gateway flows together so teams can review transaction state, JSON data, encryption and decryption behavior, and the redirect into the payment page.', stack: 'React · Payment gateway integration · Encryption', color: 'orange', icon: '⇄' },
  { id: '03', type: 'PAYMENT QA', title: 'IFC Simulator', text: 'Configure a MID-based request and generate the encrypted payload needed to forward a payment flow.', detail: 'Select the MID and environment, prepare the request, and generate the encrypted payload used by the payment process.', stack: 'React · MID configuration · Encryption', color: 'blue', icon: '⌘' },
  { id: '04', type: 'MERCHANT ONBOARDING', title: 'Custom Form Builder', text: 'Shape each client’s form layout and receipt format around their requirements.', detail: 'Custom forms are adjusted for each client and connected to the payment gateway, including the way the resulting receipt is presented.', stack: 'Node.js · React · Payment gateway integration', color: 'lavender', icon: '⟡' },
];

const skills = [
  ['01', 'Java & Spring Boot', 'API design · backend development'],
  ['02', 'React', 'Interfaces · component systems'],
  ['03', 'MySQL', 'Relational data · queries'],
  ['04', 'Debugging', 'Trace issues · fix with care'],
  ['05', 'Deployment', 'Docker · servers · releases'],
  ['06', 'Security & auth', 'JWT · CSRF · refresh tokens · RBAC'],
  ['07', 'GitHub & Jira', 'Git workflows · Agile delivery'],
];

function Laptop() {
  return <group position={[0, -0.25, 0]} rotation={[-0.12, -0.18, 0]}>
    <mesh position={[0, -0.42, 0.12]} castShadow><boxGeometry args={[2.12, 0.12, 1.3]}/><meshStandardMaterial color="#c9ccc2" metalness={0.72} roughness={0.28}/></mesh>
    <mesh position={[0, -0.34, 0.78]}><boxGeometry args={[1.5, 0.018, 0.26]}/><meshStandardMaterial color="#858a7f" metalness={0.4}/></mesh>
    <mesh position={[0, 0.26, -0.51]} rotation={[-0.12, 0, 0]} castShadow><boxGeometry args={[1.76, 1.2, 0.09]}/><meshStandardMaterial color="#d5d8ce" metalness={0.5} roughness={0.3}/></mesh>
    <mesh position={[0, 0.26, -0.37]} rotation={[-0.12, 0, 0]}><boxGeometry args={[1.58, 1.02, 0.025]}/><meshStandardMaterial color="#15241a" emissive="#0b1a11" emissiveIntensity={1}/></mesh>
    <mesh position={[-0.38, 0.55, -0.34]} rotation={[-0.12, 0, 0]}><boxGeometry args={[0.46, 0.045, 0.025]}/><meshStandardMaterial color="#cbff65" emissive="#cbff65" emissiveIntensity={0.8}/></mesh>
    <mesh position={[-0.16, 0.38, -0.34]} rotation={[-0.12, 0, 0]}><boxGeometry args={[0.83, 0.027, 0.025]}/><meshStandardMaterial color="#f0a782" emissive="#f0a782" emissiveIntensity={0.55}/></mesh>
    <mesh position={[-0.23, 0.22, -0.34]} rotation={[-0.12, 0, 0]}><boxGeometry args={[0.69, 0.027, 0.025]}/><meshStandardMaterial color="#8ebad0" emissive="#8ebad0" emissiveIntensity={0.6}/></mesh>
    <mesh position={[-0.34, 0.06, -0.34]} rotation={[-0.12, 0, 0]}><boxGeometry args={[0.48, 0.027, 0.025]}/><meshStandardMaterial color="#cbff65" emissive="#cbff65" emissiveIntensity={0.65}/></mesh>
  </group>;
}

function BugToken() {
  return <group position={[1.45, 0.8, 0.15]} rotation={[0.18, -0.25, 0.2]}>
    <mesh castShadow><sphereGeometry args={[0.28, 24, 24]}/><meshStandardMaterial color="#ff8c68" roughness={0.3} metalness={0.2}/></mesh>
    <mesh position={[0, 0.32, 0.02]} castShadow><sphereGeometry args={[0.18, 20, 20]}/><meshStandardMaterial color="#f4f1e9" roughness={0.3}/></mesh>
    {[-1, 1].map((side) => <group key={side}>
      <mesh position={[side * 0.34, 0.04, 0]} rotation={[0, 0, side * -0.58]}><boxGeometry args={[0.44, 0.035, 0.04]}/><meshStandardMaterial color="#ffb19a"/></mesh>
      <mesh position={[side * 0.31, -0.2, 0]} rotation={[0, 0, side * 0.44]}><boxGeometry args={[0.4, 0.035, 0.04]}/><meshStandardMaterial color="#ffb19a"/></mesh>
      <mesh position={[side * 0.23, 0.48, 0]} rotation={[0, 0, side * 0.55]}><boxGeometry args={[0.22, 0.035, 0.035]}/><meshStandardMaterial color="#f4f1e9"/></mesh>
    </group>)}
  </group>;
}

function ProjectToken({ position, color, shape = 'box' }: { position: [number, number, number]; color: string; shape?: 'box' | 'sphere' }) {
  return <Float position={position} speed={2.1} rotationIntensity={0.65} floatIntensity={0.3}>
    <mesh castShadow>{shape === 'sphere' ? <icosahedronGeometry args={[0.32, 0]}/> : <boxGeometry args={[0.45, 0.45, 0.45]}/>}<meshStandardMaterial color={color} metalness={0.5} roughness={0.24}/></mesh>
  </Float>;
}

function DeskScene() {
  const stage = useRef<Group>(null);
  useFrame((state, delta) => {
    if (stage.current) {
      stage.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.09;
      stage.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.06;
    }
  });
  return <>
    <group ref={stage}><Float speed={1} rotationIntensity={0.1} floatIntensity={0.15}><Laptop/><BugToken/></Float><ProjectToken position={[-1.55, 0.86, 0.25]} color="#cbff65"/><ProjectToken position={[-1.7, -0.58, 0.1]} color="#86c4d8" shape="sphere"/><ProjectToken position={[1.55, -0.7, -0.1]} color="#b7a4dc"/><mesh position={[0, -1.12, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[1.7, 1.74, 80]}/><meshBasicMaterial color="#cbff65" transparent opacity={0.4}/></mesh></group>
    <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.08} rotateSpeed={0.72} />
  </>;
}

function Reveal({ children, delay = 0, className = '', direction = 'up' }: { children: import('react').ReactNode; delay?: number; className?: string; direction?: 'up' | 'left' | 'right' | 'down' | 'zoom' | 'flip' }) {
  const reduce = useReducedMotion();
  const from = direction === 'left' ? { x: -54, y: 0 } : direction === 'right' ? { x: 54, y: 0 } : direction === 'down' ? { x: 0, y: -40 } : direction === 'zoom' ? { x: 0, y: 0, scale: 0.88 } : direction === 'flip' ? { x: 0, y: 30, rotateX: 11 } : { x: 0, y: 34 };
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, ...from }} whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: direction === 'zoom' ? 0.9 : 0.78, delay, ease: [0.2, 0.7, 0.25, 1] }}>{children}</motion.div>;
}

function AmbientDepth() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const backY = useTransform(scrollYProgress, [0, 1], ['-16vh', '92vh']);
  const backScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.45, 0.8, 1.35]);
  const backRotate = useTransform(scrollYProgress, [0, 1], [0, 210]);
  const frontY = useTransform(scrollYProgress, [0, 1], ['70vh', '-28vh']);
  const frontScale = useTransform(scrollYProgress, [0, 0.48, 1], [0.65, 1.35, 0.7]);
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [-18, 170]);
  return <div className="depth-field" aria-hidden="true">
    <motion.div className="depth-halo depth-halo-back" style={{ y: reduce ? 0 : backY, scale: reduce ? 1 : backScale, rotate: reduce ? 0 : backRotate }} />
    <motion.div className="depth-orbit" style={{ y: reduce ? 0 : frontY, rotate: reduce ? 0 : orbitRotate, scale: reduce ? 1 : frontScale }} />
    <motion.div className="depth-halo depth-halo-front" style={{ y: reduce ? 0 : frontY, scale: reduce ? 1 : frontScale }} />
    <div className="depth-grid" />
  </div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(0);
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const smoothX = useSpring(pointerX, { stiffness: 320, damping: 28, mass: 0.45 });
  const smoothY = useSpring(pointerY, { stiffness: 320, damping: 28, mass: 0.45 });
  const [cursorHover, setCursorHover] = useState(false);
  const [activeProject, setActiveProject] = useState<(typeof work)[number] | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
    const onMove = (e: MouseEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
      const target = e.target instanceof Element ? e.target.closest('a, button, [role="button"]') : null;
      setCursorHover(Boolean(target));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('mousemove', onMove); };
  }, [pointerX, pointerY]);
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);
  const closeMenu = () => setMenuOpen(false);
  const openContact = () => { setMenuOpen(false); setEmailCopied(false); setContactOpen(true); };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('madhuri.muttika29@gmail.com');
      setEmailCopied(true);
    } catch {
      setEmailCopied(false);
    }
  };
  useEffect(() => {
    if (!contactOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setContactOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [contactOpen]);

  return <div className="site-shell" style={{ '--progress': scroll } as import('react').CSSProperties}>
    <AmbientDepth />
    <div className="reading-progress" />
    <motion.div className={`custom-cursor${cursorHover ? ' is-hover' : ''}`} style={{ x: smoothX, y: smoothY }} animate={{ scale: cursorHover ? 1.22 : 1 }} transition={{ type: 'spring', stiffness: 360, damping: 24 }} aria-hidden="true"><span className="cursor-ring"><span>OPEN</span></span><span className="cursor-dot"/></motion.div>
    <header className="topbar"><a className="wordmark" href="#top" aria-label="Madhuri home"><span className="mark">m.</span><span>MADHURI MUTTIKA<br/><small>DEVELOPER · CREATIVE THINKER</small></span></a>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      <nav id="mobile-navigation" className={menuOpen ? 'nav open' : 'nav'}><a href="#work" onClick={closeMenu}>Work <sup>01</sup></a><a href="#about" onClick={closeMenu}>About <sup>02</sup></a><a href="#contact" onClick={closeMenu}>Contact <sup>03</sup></a><a className="nav-resume" href="/Madhuri_Software_Engineer_Resume.pdf" target="_blank" rel="noreferrer" onClick={closeMenu}>Resume <ArrowUpRight size={13}/></a><button className="nav-cta" type="button" onClick={openContact}>Let’s talk <ArrowUpRight size={15}/></button></nav>
    </header>

    <main id="top">
      <section className="hero section-pad">
        <Reveal className="hero-copy" direction="left"><div className="eyebrow"><span className="status-dot"/> AVAILABLE FOR OPPORTUNITIES <span className="eyebrow-line"/> INDIA · IST</div>
          <h1>Code with<br/><span className="serif-word">curiosity.</span><br/>Design with <span className="outline-word">feeling.</span></h1>
          <div className="hero-foot"><p>I’m <b>Madhuri Muttika</b> — a full stack developer who loves bringing thoughtful ideas to life, from the first sketch to the final deploy.</p><a className="round-link" href="#work" aria-label="Explore my work"><ArrowDownRight/></a></div>
        </Reveal>
        <Reveal className="hero-art" direction="right"><div className="art-stamp">MUTTIKA’S<br/>DIGITAL<br/><i>Playground</i></div><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-canvas" aria-label="Draggable 3D desk with a laptop, bug icon and project symbols. Drag to rotate."><Canvas camera={{ position: [0, 0.2, 6.4], fov: 42 }} dpr={[1, 1.5]}><ambientLight intensity={1.05}/><directionalLight position={[3, 5, 5]} intensity={2.1}/><pointLight position={[-3, 1, 3]} color="#ff7459" intensity={11}/><pointLight position={[2, -2, -2]} color="#cbff65" intensity={8}/><Suspense fallback={null}><DeskScene/></Suspense></Canvas></div><div className="art-caption"><MousePointer2 size={14}/> DRAG THE DESK TO EXPLORE</div><div className="art-note">FIG. 01 &nbsp; CODE, IDEAS<br/>& LITTLE FIXES</div></Reveal>
        <div className="hero-index">SCROLL TO EXPLORE <ArrowDown size={14}/><span>01 — 06</span></div>
      </section>

      <section id="work" className="work-section section-pad"><Reveal><div className="section-head"><div><div className="eyebrow">01 / SELECTED WORK</div><h2>Good ideas<br/><span className="serif-word">in motion.</span></h2></div><p className="section-intro">Four fintech projects across merchant onboarding and payment testing. Tap a card to explore its workflow.</p></div></Reveal>
        <div className="work-grid">{work.map((item, i) => <Reveal key={item.id} delay={(i % 2) * 0.09} direction={i % 2 === 0 ? 'left' : 'right'}><button className={`work-card ${item.color}`} onClick={() => setActiveProject(item)} aria-label={`Read more about ${item.title}`}><span className="card-top"><span>{item.type}</span><span>{item.id} / 04</span></span><span className="card-visual"><span className="visual-glyph">{item.icon}</span><span className="visual-orbit"/><span className="visual-ring"/></span><span className="card-copy"><span><strong>{item.title}</strong><span className="card-description">{item.text}</span></span><span className="card-arrow"><ArrowUpRight size={19}/></span></span><span className="card-foot">TAP TO EXPLORE <span>↗</span></span></button></Reveal>)}</div>
        <Reveal direction="flip" delay={0.12}><div className="work-note"><Sparkles size={17}/><p>Selected work from professional fintech projects. Each case study focuses on the problem, tools and my contribution.</p></div></Reveal>
      </section>

      <section className="skills-section section-pad"><Reveal direction="right"><div className="skills-heading"><div><div className="eyebrow">02 / THE TOOLKIT</div><h2>Many layers.<br/><span className="serif-word">One mindset.</span></h2></div><p>I like understanding the whole picture — how the interface feels, how the data moves, and what happens when it breaks.</p></div></Reveal><div className="skill-list">{skills.map(([num, title, detail], i) => <Reveal key={num} delay={i * 0.07} direction={i % 2 === 0 ? 'left' : 'right'}><div className="skill-row"><span className="skill-num">{num}</span><strong>{title}</strong><span className="skill-detail">{detail}</span><ArrowUpRight size={17}/></div></Reveal>)}</div></section>

      <section className="experience-section section-pad"><Reveal direction="down"><div className="eyebrow">03 / EXPERIENCE</div></Reveal><Reveal className="experience-row" direction="left"><h2>Building for<br/><span className="serif-word">real people.</span></h2><div className="experience-entry"><span className="experience-dates">SEP 2025 — PRESENT · MUMBAI</span><h3>Software Engineer <span>@ NTT DATA Payment Services</span></h3><p>Building merchant onboarding experiences and payment tools. Work includes dynamic forms, secure authentication, role-based merchant dashboards, Java and Python integration kits, Docker deployments and production releases.</p><span className="experience-tags">JAVA · SPRING BOOT · REACT · PYTHON · DOCKER · UAT</span></div></Reveal><Reveal className="experience-row internship" direction="right" delay={0.1}><span className="experience-dates">JAN 2025 — AUG 2025 · INTERNSHIP</span><div className="experience-entry"><h3>Software Engineer Intern <span>@ NTT DATA Payment Services</span></h3><p>Built payment workflow simulators, contributed to merchant onboarding form builders and improved test coverage with JUnit.</p></div></Reveal></section>

      <section className="education-section section-pad"><Reveal direction="right"><div className="eyebrow">04 / EDUCATION</div><h2>Where I <span className="serif-word">learned.</span></h2></Reveal><div className="education-list"><Reveal direction="left"><article><span className="education-period">2021 — 2025</span><div><h3>B.Tech · Computer Science & Engineering</h3><p>National Institute of Technology, Sikkim</p></div><strong>7.42 GPA</strong></article></Reveal><Reveal direction="right" delay={0.08}><article><span className="education-period">2019 — 2021</span><div><h3>Intermediate · Classes 11 & 12</h3><p>Tirumala Junior College, Visakhapatnam</p></div><strong>97.6%</strong></article></Reveal><Reveal direction="left" delay={0.16}><article><span className="education-period">2018 — 2019</span><div><h3>Secondary School · Class 10</h3><p>Bhashyam High School, Visakhapatnam</p></div><strong>10 / 10</strong></article></Reveal></div></section>

      <section id="about" className="about-section section-pad"><Reveal className="about-visual-reveal" direction="zoom"><div className="about-visual"><div className="about-circle"><div className="circle-inner"><Palette size={38}/><span>CREATIVE<br/>BY NATURE</span></div></div><div className="about-doodle">✳</div><span className="about-caption">A LITTLE ART IN EVERY ALGORITHM</span></div></Reveal><Reveal className="about-copy" direction="right"><div className="eyebrow">05 / A BIT ABOUT ME</div><h2>Part logic.<br/>Part <span className="serif-word">daydream.</span></h2><p>I’m a developer who enjoys making technology feel a little more human. I work across Java, Spring Boot, React and MySQL — and I’m happiest when I can connect the dots between a design idea and the code that makes it real.</p><p>Outside the editor, you’ll find me singing, dancing, sketching, painting, exploring new places, cooking, or striking up a conversation with someone new. Curiosity tends to follow me everywhere.</p><div className="interest-tags"><span>✷ SINGING</span><span>✷ SKETCHING</span><span>✷ TRAVEL</span><span>✷ COOKING</span><span>✷ FASHION</span></div></Reveal></section>

      <section className="statement section-pad"><Reveal direction="zoom"><motion.span className="statement-mark" initial={false} whileInView={{ rotate: [0, -10, 6, 0], scale: [0.5, 1.1, 1] }} viewport={{ once: true }} transition={{ duration: 1.1, ease: 'easeOut' }}>“</motion.span><p>I want to be the bridge between <span>what we imagine</span> and <span>what we can build.</span></p><div className="statement-byline"><span>HOW I LIKE TO WORK</span><span>— MM</span></div></Reveal></section>

      <section id="contact" className="contact-section section-pad"><Reveal direction="down"><div className="contact-kicker"><span className="status-dot"/> 06 / OPEN TO WORK · OPEN TO GOOD IDEAS</div></Reveal><Reveal direction="left"><h2>Have a good<br/><span className="serif-word">feeling?</span></h2></Reveal><Reveal direction="right" delay={0.08}><div className="contact-bottom"><p>Looking for a developer for your team, or someone to help bring a freelance project to life? I’d love to hear what you’re thinking.</p><div className="contact-actions"><button className="contact-button" type="button" onClick={openContact}>Tell me about it <ArrowUpRight/></button><a className="resume-open" href="/Madhuri_Software_Engineer_Resume.pdf" target="_blank" rel="noreferrer">Open résumé <ArrowUpRight size={15}/></a></div></div></Reveal><Reveal direction="up" delay={0.15}><div className="contact-socials"><a href="mailto:madhuri.muttika29@gmail.com"><Mail size={16}/> madhuri.muttika29@gmail.com</a><a href="https://www.linkedin.com/in/madhuri-muttika-8392aa265" target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={13}/></a><a href="https://www.instagram.com/madhuri_muttika/" target="_blank" rel="noreferrer">◎ Instagram <ArrowUpRight size={13}/></a><a href="/Madhuri_Software_Engineer_Resume.pdf" target="_blank" rel="noreferrer">Résumé PDF <ArrowUpRight size={13}/></a></div></Reveal></section>
    </main>
    <Reveal className="footer-reveal" direction="up"><footer className="footer"><a className="wordmark" href="#top"><span className="mark">m.</span><span>MADHURI MUTTIKA<br/><small>MADE WITH CURIOSITY</small></span></a><span>DESIGNED TO FEEL A LITTLE DIFFERENT <Code2 size={15}/></span><a href="#top">BACK TO TOP ↑</a></footer></Reveal>
    {activeProject && <div className="project-overlay" role="presentation" onClick={() => setActiveProject(null)}><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close project details"><X/></button><span className="eyebrow">{activeProject.id} / {activeProject.type}</span><h2 id="project-title">{activeProject.title}</h2><p>{activeProject.text}</p><p>{activeProject.detail}</p><div className="modal-stack-label">BUILT WITH</div><div className="modal-stack">{activeProject.stack}</div><div className="modal-note">Project overview based on my role and contributions. Detailed case studies can be shared in conversation.</div></section></div>}
    {contactOpen && <div className="contact-overlay" role="presentation" onClick={() => setContactOpen(false)}><section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setContactOpen(false)} aria-label="Close contact options"><X/></button><span className="eyebrow"><span className="status-dot"/> LET’S CONNECT</span><h2 id="contact-modal-title">Tell me what<br/><span className="serif-word">you’re building.</span></h2><p>Pick the easiest way to get in touch.</p><div className="contact-modal-actions"><a className="contact-button" href="mailto:madhuri.muttika29@gmail.com">Email me <Mail size={17}/></a><button className="copy-email" type="button" onClick={copyEmail}>{emailCopied ? 'Email copied ✓' : 'Copy email'}</button></div><div className="contact-modal-links"><a href="https://www.linkedin.com/in/madhuri-muttika-8392aa265" target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={14}/></a><a href="https://www.instagram.com/madhuri_muttika/" target="_blank" rel="noreferrer">◎ Instagram <ArrowUpRight size={14}/></a></div></section></div>}
    <div className="side-index">M / 2026</div>
  </div>;
}

export default App;
