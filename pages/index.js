// File: pages/index.js
// Final polished single-file portfolio page (Pages Router)
// Paste this into pages/index.js (replace existing). Requires Tailwind + framer-motion installed.

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * NOTES:
 * - Put your profile image at public/profile.jpg (or public/Ruchitha.jpeg).
 * - Put your resume at public/resume.pdf
 * - This file uses Tailwind classes. Keep your Tailwind config as usual.
 * - If you use TypeScript or the app router, minor adjustments may be needed.
 */

/* ----------------------------- Utilities ----------------------------- */
const FALLBACK_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'><rect width='100%' height='100%' fill='#1e1b4b' /><circle cx='160' cy='120' r='70' fill='#fff' opacity='0.95'/><text x='160' y='300' font-size='18' font-family='Arial' fill='%23c7d2fe' text-anchor='middle'>Ruchitha</text></svg>`
  );

function useTyping(text = "", speed = 40) {
  const [display, setDisplay] = React.useState("");
  React.useEffect(() => {
    let i = 0;
    setDisplay("");
    const id = setInterval(() => {
      setDisplay((prev) => text.slice(0, i + 1));
      i += 1;
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
    function handleMove(e) {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const dx = (x - r.width / 2) / (r.width / 2);
      const dy = (y - r.height / 2) / (r.height / 2);
      el.style.transform = `perspective(900px) rotateX(${(-dy * 6).toFixed(2)}deg) rotateY(${(dx * 6).toFixed(2)}deg)`;
    }
    function handleLeave() {
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    }
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);
  return ref;
}

/* ----------------------------- Sidebar ----------------------------- */
function Sidebar({ theme, setTheme }) {
  return (
    <aside
      aria-label="Main navigation"
      className={
        "fixed left-0 top-0 w-72 h-screen p-6 flex flex-col gap-6 z-40 " +
        (theme === "dark"
          ? "bg-slate-900/80 text-gray-100 backdrop-blur-md border-r border-black/20"
          : "bg-white/70 text-slate-900 backdrop-blur-md border-r border-slate-200")
      }
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
          RH
        </div>
        <div>
          <h1 className="text-xl font-semibold">Ruchitha H P</h1>
          <p className="text-sm opacity-60">CSE • 5th Sem • MCE Hassan</p>
        </div>
      </div>

      <nav className="flex flex-col gap-3 mt-4 text-lg" role="navigation">
        <a href="#about" className="hover:text-indigo-300 transition-colors">About</a>
        <a href="#skills" className="hover:text-indigo-300 transition-colors">Skills</a>
        <a href="#projects" className="hover:text-indigo-300 transition-colors">Projects</a>
        <a href="#gallery" className="hover:text-indigo-300 transition-colors">Gallery</a>
        <a href="#contact" className="hover:text-indigo-300 transition-colors">Contact</a>
      </nav>

      <div className="mt-auto flex flex-col gap-3">
        <button
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow hover:scale-105 transition"
          aria-pressed={theme === "dark"}
        >
          Toggle Theme
        </button>

        <a
          href="/resume.pdf"
          download="Ruchitha_HP_Resume.pdf"
          className="block text-center px-4 py-3 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow"
          aria-label="Download resume"
        >
          Download Resume
        </a>
      </div>
    </aside>
  );
}

/* ----------------------------- Sections ----------------------------- */
function Hero({ typed, theme, heroRef }) {
  return (
    <section aria-labelledby="hero-heading" className="mb-8">
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={
          "max-w-5xl p-8 rounded-3xl shadow-2xl border " +
          (theme === "dark"
            ? "bg-gradient-to-br from-indigo-900/50 to-slate-900/40 border-indigo-800/20"
            : "bg-white/60 border-slate-200")
        }
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 id="hero-heading" className="text-4xl md:text-5xl font-extrabold leading-tight">
              {typed}
              <span className="ml-1 text-indigo-400">|</span>
            </h2>
            <p className={theme === "dark" ? "text-gray-300 mt-4" : "text-gray-700 mt-4"}>
              I build delightful front-end experiences, experiment with UI, and ship small projects for learning.
            </p>

            <div className="mt-6 flex gap-4">
              <a
                href="#projects"
                className="px-5 py-3 rounded-lg bg-indigo-600 text-white shadow hover:scale-105 transition"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-5 py-3 rounded-lg border border-indigo-600 text-indigo-200 hover:bg-indigo-700 transition"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="w-44 md:w-56 flex-shrink-0">
            <img
              src="/profile.jpg"
              alt="Ruchitha"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_SVG;
              }}
              className="w-44 h-44 md:w-56 md:h-56 rounded-full object-cover border-4 border-indigo-600 shadow-2xl"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mb-8">
      <div className="p-6 rounded-2xl bg-white/5 shadow">
        <h3 className="text-2xl text-indigo-300 font-semibold mb-3">About Me</h3>
        <p className="text-gray-300">
          I'm a Computer Science Engineering student at MCE, Hassan. I enjoy frontend development, UI design, and building
          interactive small projects to learn modern web technologies and UX patterns.
        </p>
      </div>
    </section>
  );
}

function Skills() {
  const skills = ["C", "Java", "HTML", "CSS", "React", "Tailwind", "Framer Motion"];
  return (
    <section id="skills" className="mb-8">
      <div className="p-6 rounded-2xl bg-white/5 shadow">
        <h3 className="text-2xl text-indigo-300 font-semibold mb-4">Skills</h3>
        <div className="flex flex-wrap gap-3">
          {skills.map((s) => (
            <span key={s} className="px-3 py-1 rounded-full bg-indigo-700/30 text-sm">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ theme }) {
  const projects = [
    {
      title: "Student Information Manager",
      desc: "CLI + file-based system to manage student records for coursework.",
      img: "https://source.unsplash.com/720x480/?code,terminal",
      tags: ["C", "Files"],
      live: "#",
      source: "#",
    },
    {
      title: "React Portfolio",
      desc: "Interactive portfolio built with React, Tailwind and Framer Motion.",
      img: "https://source.unsplash.com/720x480/?react,website",
      tags: ["React", "Tailwind"],
      live: "#",
      source: "#",
    },
  ];

  return (
    <section id="projects" className="mb-8">
      <h3 className="text-2xl text-indigo-300 font-semibold mb-4">Projects</h3>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={
              "p-5 rounded-2xl shadow-lg border " +
              (theme === "dark" ? "bg-white/3 border-white/6" : "bg-white/60 border-slate-200")
            }
          >
            <div className="flex gap-4 items-start">
              <img
                src={p.img}
                alt={p.title}
                className="w-32 h-24 rounded-lg object-cover shadow-sm flex-shrink-0 transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://source.unsplash.com/720x480/?design";
                }}
              />
              <div>
                <h4 className="text-lg text-indigo-200 font-semibold">{p.title}</h4>
                <p className="text-gray-300 mt-2">{p.desc}</p>

                <div className="flex gap-2 mt-3">
                  {p.tags.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-indigo-700/30 text-xs">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-6 mt-4">
                  <a href={p.live} className="text-indigo-300 font-medium hover:underline">
                    Live
                  </a>
                  <a href={p.source} className="text-indigo-300 font-medium hover:underline">
                    Source
                  </a>
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
    { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80", label: "UI Work" },
    { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80", label: "Coding" },
    { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80", label: "Team Work" },
    { src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80", label: "Desk" },
  ];

  const [lightbox, setLightbox] = React.useState(null);

  return (
    <section id="gallery" className="mb-8">
      <h3 className="text-2xl text-indigo-300 font-semibold mb-4">Gallery</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {IMAGES.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.label}
            className="w-full h-40 object-cover rounded-lg cursor-pointer shadow-lg"
            onClick={() => setLightbox(i)}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://source.unsplash.com/720x480/?design";
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.img
              src={IMAGES[lightbox].src}
              alt={IMAGES[lightbox].label}
              className="max-w-4xl max-h-[80vh] rounded-xl shadow-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mb-24">
      <div className="p-6 rounded-2xl bg-white/5 shadow">
        <h3 className="text-2xl text-indigo-300 font-semibold mb-2">Contact</h3>
        <p className="text-gray-300">Email: ruchithapram@gmail.com</p>
      </div>
    </section>
  );
}

/* ----------------------------- Main Page ----------------------------- */

export default function Home() {
  // theme stored in localStorage if available
  const [theme, setTheme] = React.useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "dark";
  });
  React.useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch {}
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const typed = useTyping("Hi, I’m Ruchitha — a CSE student who loves learning and building small projects.", 30);
  const heroRef = useTilt();

  return (
    <div
      className={
        "min-h-screen flex transition-colors duration-500 " +
        (theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-indigo-950 to-black text-gray-100"
          : "bg-gradient-to-br from-white via-indigo-50 to-pink-50 text-slate-900")
      }
    >
      <Sidebar theme={theme} setTheme={setTheme} />

      <main className="flex-1 p-8 md:p-12 ml-72">
        <Hero typed={typed} theme={theme} heroRef={heroRef} />

        <About />
        <Skills />
        <Projects theme={theme} />
        <Gallery />
        <Contact />

        <footer className="mt-8 text-sm text-gray-400">
          <div className="max-w-5xl">
            © {new Date().getFullYear()} Ruchitha H P — Built with Next.js, Tailwind CSS, Framer Motion.
          </div>
        </footer>
      </main>
    </div>
  );
}
