import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- FALLBACK SVG ---------------- */
const FALLBACK_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'><rect width='100%' height='100%' fill='#1b1236' /><circle cx='160' cy='130' r='70' fill='#fff' opacity='0.9'/><text x='160' y='305' font-size='18' font-family='Arial' fill='%23c7d2fe' text-anchor='middle'>Ruchitha</text></svg>"
)}`;

/* ---------------- Typing + Tilt Hooks ---------------- */
function useTyping(text, speed = 40) {
  const [display, setDisplay] = React.useState("");
  React.useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplay((prev) => text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return display;
}

function useTilt() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = (x - rect.width / 2) / (rect.width / 2);
      const dy = (y - rect.height / 2) / (rect.height / 2);
      el.style.transform = `perspective(800px) rotateX(${(-dy * 6).toFixed(2)}deg) rotateY(${(dx * 6).toFixed(2)}deg)`;
    }
    function onLeave() {
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return ref;
}

/* ---------------- Social Icons (inline SVG) ---------------- */
function IconGitHub({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.18.08 1.8 1.21 1.8 1.21 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.5 3.17-1.18 3.17-1.18.63 1.57.24 2.73.12 3.02.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.67.42.36.8 1.08.8 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
function IconLinkedIn({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5V24H0V8zm7.5 0h4.8v2.2h.07c.67-1.26 2.3-2.6 4.73-2.6C23.5 7.6 24 11.1 24 15.5V24h-5v-7.5c0-1.79-.03-4.09-2.5-4.09-2.5 0-2.87 1.95-2.87 3.98V24h-5V8z" />
    </svg>
  );
}
function IconMail({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4l-8 5L4 8V6l8 5 8-5v2z" />
    </svg>
  );
}

/* ---------------- Sidebar (desktop + mobile handled by earlier layout) ---------------- */
function Sidebar({ theme, setTheme }) {
  return (
    <aside
      className={
        theme === "dark"
          ? "hidden md:flex fixed left-0 top-0 w-72 h-screen flex-col p-6 bg-gradient-to-b from-gray-950/80 to-black/40 text-white backdrop-blur"
          : "hidden md:flex fixed left-0 top-0 w-72 h-screen flex-col p-6 bg-white/80 text-gray-900 backdrop-blur"
      }
      aria-label="Sidebar"
    >
      <div className="flex items-center gap-3">
        <img src="/profile.jpg" alt="Ruchitha" className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500" onError={(e)=> e.currentTarget.src = FALLBACK_SVG} />
        <div>
          <h1 className="text-lg font-bold text-indigo-400">Ruchitha H P</h1>
          <p className="text-sm opacity-70">CSE • 5th Sem • MCE Hassan</p>
        </div>
      </div>

      <nav className="mt-8 flex flex-col gap-3">
        {["about", "skills", "projects", "gallery", "contact"].map(s => (
          <a key={s} href={`#${s}`} className="text-sm hover:text-indigo-300 transition">{s.toUpperCase()}</a>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="flex gap-3 items-center">
          <a href="https://github.com/your-github" aria-label="GitHub" className="p-2 rounded-md hover:bg-white/5">
            <IconGitHub className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/your-linkedin" aria-label="LinkedIn" className="p-2 rounded-md hover:bg-white/5">
            <IconLinkedIn className="w-5 h-5" />
          </a>
          <a href="mailto:ruchithapram@gmail.com" aria-label="Email" className="p-2 rounded-md hover:bg-white/5">
            <IconMail className="w-5 h-5" />
          </a>
        </div>

        <button
          className="mt-5 w-full px-4 py-2 rounded-md bg-indigo-600 text-white"
          onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
          aria-pressed={theme === "dark"}
        >
          Toggle Theme
        </button>

        <a href="/resume.pdf" download="resume.pdf" className="block mt-4 text-center bg-indigo-600 py-3 rounded-md text-white shadow">
          Download Resume
        </a>
      </div>
    </aside>
  );
}

/* ---------------- Sections (About, Skills, Projects, Gallery, Contact) ---------------- */
function About() {
  return (
    <section id="about" className="mb-8">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-xl bg-white/5 shadow">
        <h2 className="text-2xl text-indigo-300 font-semibold mb-2">About Me</h2>
        <p className="text-gray-300 leading-relaxed">
          I am a Computer Science Engineering student at MCE, Hassan. I enjoy frontend development, UI design, and building interactive projects that demonstrate thoughtful UI and clean code.
        </p>
      </motion.div>
    </section>
  );
}

function Skills() {
  const skills = ["C", "Java", "HTML", "CSS", "React", "Tailwind CSS", "Framer Motion"];
  return (
    <section id="skills" className="mb-8">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-xl bg-white/5 shadow">
        <h2 className="text-2xl text-indigo-300 font-semibold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map(s => (
            <span key={s} className="px-3 py-1 rounded-full bg-indigo-700/30 text-sm">{s}</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Projects() {
  const data = [
    {
      title: "Student Information Manager",
      desc: "A CLI + file-based system to manage student records for coursework.",
      tech: ["C", "Files"],
      img: "/project-student.png" // optional - replace if you have thumbnail
    },
    {
      title: "React Portfolio",
      desc: "My interactive portfolio built with React, Tailwind and Framer Motion.",
      tech: ["React", "Tailwind"],
      img: "/project-portfolio.png" // optional
    }
  ];

  return (
    <section id="projects" className="mb-8">
      <div className="grid gap-6 md:grid-cols-2">
        {data.map((p, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-4 rounded-xl bg-white/5 shadow hover:scale-[1.01] transition-transform"
          >
            <div className="flex gap-4">
              <div className="w-28 h-20 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" onError={(e)=> e.currentTarget.style.opacity=0.35} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-indigo-200">{p.title}</h3>
                <p className="text-gray-300 mt-2">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 bg-white/5 rounded">{t}</span>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <a href="#" className="text-indigo-400 text-sm">Live</a>
                  <a href="#" className="text-indigo-400 text-sm">Source</a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const IMAGES = [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1518770660439-4636190af475",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
  ];

  const [index, setIndex] = React.useState(null);

  return (
    <section id="gallery" className="mb-8">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-xl bg-white/5 shadow">
        <h2 className="text-2xl text-indigo-300 font-semibold mb-4">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {IMAGES.map((s, i) => (
            <img key={i} src={s} alt={`Gallery ${i}`} className="rounded-xl cursor-pointer hover:opacity-80" onClick={() => setIndex(i)} />
          ))}
        </div>

        <AnimatePresence>
          {index !== null && (
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div onClick={() => setIndex(null)} className="absolute inset-0" />
              <motion.img src={IMAGES[index]} alt="" className="max-w-4xl max-h-[80vh] rounded-xl shadow-2xl z-10" initial={{ scale: 0.95 }} animate={{ scale: 1 }} />
              <button aria-label="Close" className="absolute top-6 right-6 text-white text-3xl" onClick={() => setIndex(null)}>✕</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mb-20">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-xl bg-white/5 shadow">
        <h2 className="text-2xl text-indigo-300 font-semibold mb-2">Contact</h2>
        <p className="text-gray-300">Email: <a href="mailto:ruchithapram@gmail.com" className="text-indigo-300">ruchithapram@gmail.com</a></p>
        <div className="mt-4 flex gap-3">
          <a className="text-indigo-300" href="https://github.com/your-github" aria-label="GitHub link"><IconGitHub /></a>
          <a className="text-indigo-300" href="https://linkedin.com/in/your-linkedin" aria-label="LinkedIn link"><IconLinkedIn /></a>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------ Footer + Background Orbs ------------------ */
function Footer() {
  return (
    <footer className="mt-8 py-6 text-center text-sm text-gray-400">
      © {new Date().getFullYear()} Ruchitha H P — Built with Next.js & Tailwind CSS
    </footer>
  );
}

/* --------------------- Main Page --------------------- */
export default function Home() {
  const [theme, setTheme] = React.useState("dark");
  const typed = useTyping("Hi, I’m Ruchitha — a CSE student who loves building UI and learning new tech.");
  const heroRef = useTilt();
  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <div className={theme === "dark" ? "min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-gray-200" : "min-h-screen bg-gradient-to-br from-white via-indigo-50 to-pink-50 text-gray-900"}>
      {/* subtle background orbs */}
      <div aria-hidden className="fixed -z-10 inset-0 pointer-events-none">
        <div className="absolute -left-32 -top-32 w-80 h-80 bg-gradient-to-br from-indigo-600 to-pink-500 opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute right-[-80px] bottom-[-80px] w-96 h-96 bg-gradient-to-br from-pink-400 to-yellow-300 opacity-8 blur-3xl rounded-full"></div>
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-4 left-4 right-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
          <img src="/profile.jpg" alt="R" className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500" onError={(e)=> e.currentTarget.src = FALLBACK_SVG} />
          <div className="text-white font-semibold">Ruchitha H P</div>
        </div>
        <div className="flex items-center gap-3">
          <button aria-label="Toggle theme" onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))} className="p-2 rounded-md bg-white/5 text-white">🌓</button>
          <button aria-label="Open menu" onClick={() => setOpenMenu(true)} className="p-2 rounded-md bg-white/5 text-white text-2xl">☰</button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <Sidebar theme={theme} setTheme={setTheme} />

      {/* Mobile sliding menu */}
      <AnimatePresence>
        {openMenu && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.25 }} className="fixed right-0 top-0 w-72 h-full bg-gradient-to-b from-gray-950 to-black text-white p-6 z-50 md:hidden">
            <button aria-label="Close menu" onClick={() => setOpenMenu(false)} className="absolute top-4 right-4 text-3xl">✕</button>
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-6">
                <img src="/profile.jpg" alt="Ruchitha" className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500" onError={(e)=> e.currentTarget.src = FALLBACK_SVG} />
                <div>
                  <div className="font-semibold text-indigo-300">Ruchitha H P</div>
                  <div className="text-xs opacity-70">CSE • MCE Hassan</div>
                </div>
              </div>
              <nav className="flex flex-col gap-3">
                {["about", "skills", "projects", "gallery", "contact"].map(s => (
                  <a key={s} href={`#${s}`} onClick={() => setOpenMenu(false)} className="hover:text-indigo-300">{s.toUpperCase()}</a>
                ))}
              </nav>
              <div className="mt-6">
                <a href="/resume.pdf" download className="block text-center bg-indigo-600 py-3 rounded-md">Download Resume</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="md:ml-72 p-6 md:p-12">
        {/* Hero */}
        <motion.section ref={heroRef} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto p-8 md:p-10 rounded-2xl bg-white/5 shadow-lg border border-white/5">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <img src="/profile.jpg" alt="Ruchitha H P" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-indigo-600 shadow-lg" onError={(e)=> e.currentTarget.src = FALLBACK_SVG} />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">{typed}</h1>
              <p className="text-indigo-300 mt-3 text-lg">Frontend Developer • React & UI Enthusiast • CSE Student</p>
              <p className="text-gray-300 mt-4 max-w-xl">
                I build responsive and accessible web interfaces using modern tooling — React, Next.js, Tailwind CSS and Framer Motion. I love turning designs into interactable experiences.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#projects" className="px-4 py-2 rounded-md bg-indigo-600 text-white">My Work</a>
                <a href="/resume.pdf" download className="px-4 py-2 rounded-md border border-indigo-600 text-indigo-300">Download Resume</a>
                <a href="mailto:ruchithapram@gmail.com" className="px-4 py-2 rounded-md bg-white/5 text-white">Email Me</a>
              </div>

              <div className="mt-6 flex gap-3">
                <a href="https://github.com/your-github" aria-label="GitHub" className="p-2 rounded-md bg-white/5 hover:bg-white/10"><IconGitHub /></a>
                <a href="https://linkedin.com/in/your-linkedin" aria-label="LinkedIn" className="p-2 rounded-md bg-white/5 hover:bg-white/10"><IconLinkedIn /></a>
                <a href="mailto:ruchithapram@gmail.com" aria-label="Email" className="p-2 rounded-md bg-white/5 hover:bg-white/10"><IconMail /></a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Sections */}
        <div className="max-w-4xl mx-auto mt-8 space-y-8">
          <About />
          <Skills />
          <Projects />
          <Gallery />
          <Contact />
          <Footer />
        </div>
      </main>
    </div>
  );
}
