import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Fallback SVG for missing profile image
const FALLBACK_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'><rect width='100%' height='100%' fill='#1e1b4b' /><circle cx='160' cy='130' r='70' fill='#fff' opacity='0.9'/><text x='160' y='305' font-size='18' font-family='Arial' fill='%23c7d2fe' text-anchor='middle'>Ruchitha</text></svg>"
)}`;

// Typing animation hook
function useTyping(text, speed = 45) {
  const [display, setDisplay] = React.useState("");
  React.useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i += 1;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return display;
}

// Tilt effect for hero card
function useTilt() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function move(e) {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const dx = (x - r.width / 2) / (r.width / 2);
      const dy = (y - r.height / 2) / (r.height / 2);
      el.style.transform = `perspective(900px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg)`;
    }
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", () => {
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });
    return () => {
      el.removeEventListener("mousemove", move);
    };
  }, []);
  return ref;
}

/* ----------------------------- SIDEBAR ----------------------------- */
function Sidebar({ theme, setTheme }) {
  return (
    <aside
      className={
        theme === "dark"
          ? "fixed left-0 top-0 w-72 h-screen p-6 bg-gray-950/70 backdrop-blur-xl text-white"
          : "fixed left-0 top-0 w-72 h-screen p-6 bg-white/70 backdrop-blur-xl text-gray-900"
      }
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
          RH
        </div>
        <div>
          <h1 className="text-xl font-bold text-indigo-400">Ruchitha H P</h1>
          <p className="text-sm opacity-70">CSE • 5th Sem • MCE Hassan</p>
        </div>
      </div>

      <nav className="flex flex-col gap-4 mt-10 text-lg">
        <a href="#about" className="hover:text-indigo-400">About</a>
        <a href="#skills" className="hover:text-indigo-400">Skills</a>
        <a href="#projects" className="hover:text-indigo-400">Projects</a>
        <a href="#gallery" className="hover:text-indigo-400">Gallery</a>
        <a href="#contact" className="hover:text-indigo-400">Contact</a>
      </nav>

      <button
        className="mt-6 px-3 py-2 rounded-md bg-indigo-600 text-white"
        onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      >
        Toggle Theme
      </button>

      <a
        href="/resume.pdf"
        download
        className="mt-6 block text-center bg-indigo-600 py-3 rounded-lg text-white shadow"
      >
        Download Resume
      </a>
    </aside>
  );
}

/* ----------------------------- SECTIONS ----------------------------- */
function About() {
  return (
    <section id="about" className="mt-8">
      <div className="p-6 rounded-xl bg-white/5 shadow">
        <h2 className="text-2xl text-indigo-300 font-semibold mb-2">About Me</h2>
        <p className="text-gray-300">
          I am a Computer Science Engineering student at MCE, Hassan.
          I enjoy frontend development, UI design, and building small interactive projects that help me learn.
        </p>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <div className="p-6 rounded-xl bg-white/5 shadow mt-10">
        <h2 className="text-2xl text-indigo-300 font-semibold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {["C", "Java", "HTML", "CSS", "React", "Framer Motion", "Tailwind"].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full bg-indigo-700/40 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const data = [
    {
      title: "Student Information Manager",
      desc: "A CLI + file-based program for managing student records.",
    },
    {
      title: "React Portfolio",
      desc: "An interactive portfolio made using React, Tailwind, and Framer Motion.",
    },
  ];

  return (
    <section id="projects">
      <div className="p-6 rounded-xl bg-white/5 shadow mt-10">
        <h2 className="text-2xl text-indigo-300 font-semibold mb-4">Projects</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {data.map((p, i) => (
            <div key={i} className="p-4 rounded-lg bg-white/5 shadow">
              <h3 className="text-lg text-indigo-200 font-semibold">{p.title}</h3>
              <p className="text-gray-300 mt-2">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const IMAGES = [
    { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c", label: "UI Work" },
    { src: "https://images.unsplash.com/photo-1518770660439-4636190af475", label: "Coding" },
    { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c", label: "Team Work" },
    { src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c", label: "Desk Setup" }
  ];

  const [lightbox, setLightbox] = React.useState(null);

  return (
    <section id="gallery">
      <div className="p-6 rounded-xl bg-white/5 shadow mt-10">
        <h2 className="text-2xl text-indigo-300 font-semibold mb-4">Gallery</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {IMAGES.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.label}
              className="rounded-xl cursor-pointer hover:opacity-80"
              onClick={() => setLightbox(i)}
            />
          ))}
        </div>

        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
            >
              <img
                src={IMAGES[lightbox].src}
                alt="Full"
                className="max-w-3xl max-h-[80vh] rounded-xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact">
      <div className="p-6 rounded-xl bg-white/5 shadow mt-10 mb-20">
        <h2 className="text-2xl text-indigo-300 font-semibold mb-2">Contact</h2>
        <p className="text-gray-300">Email: ruchithapram@gmail.com</p>
      </div>
    </section>
  );
}

/* --------------------------- MAIN PAGE --------------------------- */

export default function Home() {
  const [theme, setTheme] = React.useState("dark");

  const typed = useTyping(
    "Hi, I’m Ruchitha — a CSE student who loves learning and building small projects."
  );

  const heroRef = useTilt();

  return (
    <div
      className={
        theme === "dark"
          ? "min-h-screen flex bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-gray-200 overflow-hidden select-none transition-colors duration-500"
          : "min-h-screen flex bg-gradient-to-br from-white via-indigo-50 to-pink-50 text-gray-900 overflow-hidden select-none transition-colors duration-500"
      }
    >
      <Sidebar theme={theme} setTheme={setTheme} />

      <main className="flex-1 p-12 ml-72">
        <div
          ref={heroRef}
          className="max-w-3xl p-8 rounded-2xl bg-white/5 shadow-lg"
        >
          <div className="flex items-center gap-6">
            <img
              src="/profile.jpg"
              alt="Profile"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_SVG;
              }}
              className="w-28 h-28 rounded-full object-cover shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold leading-tight">{typed}</h1>
              <p className="mt-2 text-gray-400">Frontend Developer • UI Enthusiast</p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <a
              href="#projects"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-4 py-2 rounded-md border border-indigo-600 text-indigo-200"
            >
              Contact
            </a>
          </div>
        </div>

        <About />
        <Skills />
        <Projects />
        <Gallery />
        <Contact />
      </main>
    </div>
  );
}