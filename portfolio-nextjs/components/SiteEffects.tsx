"use client";

import { useEffect, useRef } from "react";

/**
 * Progressive-enhancement layer, ported 1:1 from the tested static build.
 * Operates on class/attribute hooks in the server-rendered markup:
 *   .reveal / .metric      -> add `.in` when scrolled into view
 *   [data-count][data-dec] -> animated count-up
 *   #gpaArc                -> stroke-dashoffset ring animation
 *   #ps-matrix             -> decorative "solved problems" grid
 * Plus the custom cursor (desktop + fine pointer + motion allowed only).
 *
 * All listeners/observers are cleaned up so React 18 StrictMode's
 * double-mount in development can't leak or duplicate anything.
 */
export default function SiteEffects() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    /* ---------- reveal + metric bars ---------- */
    if (reduce) {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((n) => n.classList.add("in"));
      document.querySelectorAll<HTMLElement>(".metric").forEach((m) => m.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (ents) => {
          ents.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
      );
      document.querySelectorAll<HTMLElement>(".reveal").forEach((n) => io.observe(n));
      cleanups.push(() => io.disconnect());

      const mo = new IntersectionObserver(
        (ents) => {
          ents.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              mo.unobserve(e.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      document.querySelectorAll<HTMLElement>(".metric").forEach((m) => mo.observe(m));
      cleanups.push(() => mo.disconnect());
    }

    /* ---------- counters ---------- */
    const animateCount = (node: HTMLElement) => {
      const target = parseFloat(node.getAttribute("data-count") || "0");
      const dec = parseInt(node.getAttribute("data-dec") || "0", 10);
      if (reduce) {
        node.textContent = target.toFixed(dec);
        return;
      }
      const dur = 1300;
      let start: number | null = null;
      let raf = 0;
      const frame = (t: number) => {
        if (start === null) start = t;
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        node.textContent = (target * eased).toFixed(dec);
        if (p < 1) raf = requestAnimationFrame(frame);
        else node.textContent = target.toFixed(dec);
      };
      raf = requestAnimationFrame(frame);
      cleanups.push(() => cancelAnimationFrame(raf));
    };
    const seen = new WeakSet<Element>();
    const co = new IntersectionObserver(
      (ents) => {
        ents.forEach((e) => {
          if (e.isIntersecting && !seen.has(e.target)) {
            seen.add(e.target);
            animateCount(e.target as HTMLElement);
          }
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => co.observe(n));
    cleanups.push(() => co.disconnect());

    /* ---------- gpa ring ---------- */
    const arc = document.getElementById("gpaArc");
    if (arc) {
      const full = 402;
      const off = full * (1 - 9.51 / 10);
      const go = new IntersectionObserver(
        (ents) => {
          ents.forEach((e) => {
            if (e.isIntersecting) {
              if (reduce) {
                arc.style.strokeDashoffset = String(off);
              } else {
                arc.style.transition = "stroke-dashoffset 1.6s cubic-bezier(.16,1,.3,1)";
                requestAnimationFrame(() => {
                  arc.style.strokeDashoffset = String(off);
                });
              }
              go.disconnect();
            }
          });
        },
        { threshold: 0.5 }
      );
      go.observe(arc);
      cleanups.push(() => go.disconnect());
    }

    /* ---------- problem-solving matrix ---------- */
    const matrix = document.getElementById("ps-matrix");
    if (matrix) {
      matrix.innerHTML = ""; // idempotent across StrictMode re-runs
      const N = 120;
      for (let i = 0; i < N; i++) {
        const c = document.createElement("div");
        c.className = "ps__cell";
        matrix.appendChild(c);
      }
      const cells = Array.from(matrix.querySelectorAll<HTMLElement>(".ps__cell"));
      const timeouts: number[] = [];
      const mo2 = new IntersectionObserver(
        (ents) => {
          ents.forEach((e) => {
            if (e.isIntersecting) {
              cells.forEach((c, idx) => {
                const lit = Math.random() < 0.82;
                const delay = reduce ? 0 : idx * 9;
                const id = window.setTimeout(() => {
                  if (lit) {
                    const t = Math.random();
                    c.style.background = t > 0.72 ? "#37D3E0" : t > 0.4 ? "#5B8CFF" : "#3B4F6B";
                    c.style.borderColor = "transparent";
                  }
                }, delay);
                timeouts.push(id);
              });
              mo2.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      mo2.observe(matrix);
      cleanups.push(() => {
        mo2.disconnect();
        timeouts.forEach((id) => clearTimeout(id));
        matrix.innerHTML = "";
      });
    }

    /* ---------- custom cursor ---------- */
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!fine || reduce || !ring || !dot) {
      document.body.classList.add("no-cursor");
    } else {
      let rx = window.innerWidth / 2;
      let ry = window.innerHeight / 2;
      let mx = rx;
      let my = ry;
      let raf = 0;
      const onMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      };
      const loop = () => {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
        raf = requestAnimationFrame(loop);
      };
      const hotSel = "a,button,input,.card,.pill,.filter,.repo,.t";
      const onOver = (e: MouseEvent) => {
        if ((e.target as Element).closest(hotSel)) ring.classList.add("hot");
      };
      const onOut = (e: MouseEvent) => {
        if ((e.target as Element).closest(hotSel)) ring.classList.remove("hot");
      };
      const onLeave = () => {
        ring.style.opacity = "0";
        dot.style.opacity = "0";
      };
      const onEnter = () => {
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseover", onOver);
      document.addEventListener("mouseout", onOut);
      document.addEventListener("mouseleave", onLeave);
      document.addEventListener("mouseenter", onEnter);
      loop();
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseover", onOver);
        document.removeEventListener("mouseout", onOut);
        document.removeEventListener("mouseleave", onLeave);
        document.removeEventListener("mouseenter", onEnter);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}
