"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

/** Cursor-reactive node network. Pauses when scrolled offscreen. */
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let running = false;
    const LINK = 120;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * DPR);
      canvas.height = Math.round(h * DPR);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.round(Math.min(90, Math.max(26, (w * h) / 16000)));
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.6 + 0.7,
        });
      }
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        if (mouse.active) {
          const dxm = n.x - mouse.x;
          const dym = n.y - mouse.y;
          const dm = Math.sqrt(dxm * dxm + dym * dym);
          if (dm < 150) {
            const f = ((150 - dm) / 150) * 0.6;
            n.x += (dxm / dm) * f;
            n.y += (dym / dm) * f;
          }
        }
      }
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const dx = nodes[a].x - nodes[b].x;
          const dy = nodes[a].y - nodes[b].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            const al = (1 - d / LINK) * 0.5;
            ctx.strokeStyle = "rgba(91,140,255," + al.toFixed(3) + ")";
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(nodes[a].x, nodes[a].y);
            ctx.lineTo(nodes[b].x, nodes[b].y);
            ctx.stroke();
          }
        }
      }
      if (mouse.active) {
        for (let c = 0; c < nodes.length; c++) {
          const mdx = nodes[c].x - mouse.x;
          const mdy = nodes[c].y - mouse.y;
          const md = Math.sqrt(mdx * mdx + mdy * mdy);
          if (md < 170) {
            const ma = (1 - md / 170) * 0.7;
            ctx.strokeStyle = "rgba(177,140,255," + ma.toFixed(3) + ")";
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[c].x, nodes[c].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      for (let p = 0; p < nodes.length; p++) {
        ctx.beginPath();
        ctx.arc(nodes[p].x, nodes[p].y, nodes[p].r, 0, 6.283);
        ctx.fillStyle = "rgba(180,205,255,0.75)";
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame();
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    let rt: number | undefined;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(() => {
        resize();
        if (reduce) frame();
      }, 200);
    };

    resize();

    let vis: IntersectionObserver | null = null;
    if (reduce) {
      frame();
      stop(); // a single static frame
    } else {
      start();
      canvas.addEventListener("mousemove", onMove);
      canvas.addEventListener("mouseleave", onLeave);
      vis = new IntersectionObserver(
        (ents) => {
          ents.forEach((e) => {
            if (e.isIntersecting) start();
            else stop();
          });
        },
        { threshold: 0.01 }
      );
      vis.observe(canvas);
    }
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      window.clearTimeout(rt);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      vis?.disconnect();
    };
  }, []);

  return <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />;
}
