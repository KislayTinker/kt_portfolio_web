"use client";

import { useEffect, useRef } from "react";
import { SITE } from "@/data/content";

const LINKS: { href: string; label: string }[] = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

const NAV_IDS = ["home", "about", "skills", "projects", "experience", "education", "contact"];
const SECTION_ORDER = [
  "home",
  "about",
  "skills",
  "projects",
  "inside",
  "playground",
  "problem-solving",
  "experience",
  "education",
  "github",
  "contact",
];

export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    const toggle = toggleRef.current;
    if (!nav || !toggle) return;
    const cleanups: Array<() => void> = [];

    /* scroll state */
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    /* mobile toggle */
    const onToggle = () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    toggle.addEventListener("click", onToggle);
    cleanups.push(() => toggle.removeEventListener("click", onToggle));

    const linkEls = Array.from(nav.querySelectorAll<HTMLAnchorElement>(".nav__links a"));
    const closeMenu = () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };
    linkEls.forEach((a) => a.addEventListener("click", closeMenu));
    cleanups.push(() => linkEls.forEach((a) => a.removeEventListener("click", closeMenu)));

    /* scrollspy */
    const map: Record<string, HTMLAnchorElement> = {};
    linkEls.forEach((a) => {
      const h = a.getAttribute("href");
      if (h && h.indexOf("#") === 0) map[h.slice(1)] = a;
    });
    const nearestNavId = (id: string) => {
      const i = SECTION_ORDER.indexOf(id);
      if (i < 0) return "home";
      for (let j = i; j >= 0; j--) {
        if (NAV_IDS.indexOf(SECTION_ORDER[j]) >= 0) return SECTION_ORDER[j];
      }
      return "home";
    };
    const spy = new IntersectionObserver(
      (ents) => {
        ents.forEach((e) => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).id;
            Object.keys(map).forEach((k) => map[k].classList.remove("active"));
            const use = map[id] ? id : nearestNavId(id);
            if (map[use]) map[use].classList.add("active");
          }
        });
      },
      { threshold: 0.01, rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll<HTMLElement>("main section[id]").forEach((s) => spy.observe(s));
    cleanups.push(() => spy.disconnect());

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <header className="nav" id="nav" ref={navRef}>
      <div className="wrap nav__row">
        <a className="brand" href="#home" aria-label="Kislay Tinker — home">
          <svg className="brand__mark" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="7" fill="#0E141D" stroke="rgba(126,148,178,.22)" />
            <path
              d="M9 23V9M9 16l8-7M9 16l8 7"
              stroke="url(#bg1)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="24" cy="10" r="2.4" fill="#37D3E0" />
            <defs>
              <linearGradient id="bg1" x1="9" y1="9" x2="17" y2="23">
                <stop stopColor="#5B8CFF" />
                <stop offset="1" stopColor="#B18CFF" />
              </linearGradient>
            </defs>
          </svg>
          <span>
            {SITE.name}
            <small>Data Science · ML</small>
          </span>
        </a>
        <nav className="nav__links" id="navlinks" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn btn--primary nav__cta">
            Let&apos;s connect
          </a>
        </nav>
        <button
          className="nav__toggle"
          id="navToggle"
          aria-label="Toggle menu"
          aria-expanded="false"
          aria-controls="navlinks"
          ref={toggleRef}
        >
          <span />
        </button>
      </div>
    </header>
  );
}
