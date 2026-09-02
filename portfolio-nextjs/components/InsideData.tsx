"use client";

import { useEffect, useRef } from "react";
import { PROJECTS, RADAR, CAT_COLOR, type Category } from "@/data/content";
import { usePrefersReducedMotion } from "@/lib/hooks";

const NS = "http://www.w3.org/2000/svg";

export default function InsideData() {
  const sectionRef = useRef<HTMLElement>(null);
  const radarRef = useRef<SVGSVGElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const donutRef = useRef<SVGSVGElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const radar = radarRef.current;
    const bars = barsRef.current;
    const donut = donutRef.current;
    const legend = legendRef.current;
    const reveals: Array<() => void> = [];

    /* ---------- radar ---------- */
    if (radar) {
      radar.innerHTML = "";
      const cx = 160;
      const cy = 150;
      const R = 98;
      const n = RADAR.length;
      const rings = 4;
      const pt = (i: number, r: number): [number, number] => {
        const ang = -Math.PI / 2 + i * ((2 * Math.PI) / n);
        return [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r];
      };
      for (let g = 1; g <= rings; g++) {
        let pts = "";
        for (let i = 0; i < n; i++) {
          const p = pt(i, (R * g) / rings);
          pts += `${p[0].toFixed(1)},${p[1].toFixed(1)} `;
        }
        const poly = document.createElementNS(NS, "polygon");
        poly.setAttribute("points", pts.trim());
        poly.setAttribute("fill", "none");
        poly.setAttribute("stroke", "rgba(126,148,178,.14)");
        poly.setAttribute("stroke-width", "1");
        radar.appendChild(poly);
      }
      for (let i = 0; i < n; i++) {
        const pe = pt(i, R);
        const ln = document.createElementNS(NS, "line");
        ln.setAttribute("x1", String(cx));
        ln.setAttribute("y1", String(cy));
        ln.setAttribute("x2", String(pe[0]));
        ln.setAttribute("y2", String(pe[1]));
        ln.setAttribute("stroke", "rgba(126,148,178,.14)");
        ln.setAttribute("stroke-width", "1");
        radar.appendChild(ln);
        const lp = pt(i, R + 22);
        const tx = document.createElementNS(NS, "text");
        tx.setAttribute("x", String(lp[0]));
        tx.setAttribute("y", String(lp[1]));
        tx.setAttribute("fill", "#9AA6B8");
        tx.setAttribute("font-size", "9");
        tx.setAttribute("font-family", "JetBrains Mono, monospace");
        tx.setAttribute("text-anchor", lp[0] < cx - 8 ? "end" : lp[0] > cx + 8 ? "start" : "middle");
        tx.setAttribute("dominant-baseline", "middle");
        tx.textContent = RADAR[i].k;
        radar.appendChild(tx);
      }
      let dpts = "";
      for (let i = 0; i < n; i++) {
        const pv = pt(i, R * RADAR[i].v);
        dpts += `${pv[0].toFixed(1)},${pv[1].toFixed(1)} `;
      }
      const dpoly = document.createElementNS(NS, "polygon");
      dpoly.setAttribute("points", dpts.trim());
      dpoly.setAttribute("fill", "rgba(91,140,255,.16)");
      dpoly.setAttribute("stroke", "#5B8CFF");
      dpoly.setAttribute("stroke-width", "2");
      dpoly.setAttribute("stroke-linejoin", "round");
      dpoly.style.transformOrigin = `${cx}px ${cy}px`;
      if (!reduce) {
        dpoly.style.transform = "scale(0)";
        dpoly.style.transition = "transform 1.1s cubic-bezier(.16,1,.3,1)";
      }
      radar.appendChild(dpoly);
      for (let i = 0; i < n; i++) {
        const pd = pt(i, R * RADAR[i].v);
        const c = document.createElementNS(NS, "circle");
        c.setAttribute("cx", String(pd[0]));
        c.setAttribute("cy", String(pd[1]));
        c.setAttribute("r", "3");
        c.setAttribute("fill", "#37D3E0");
        radar.appendChild(c);
      }
      reveals.push(() => {
        if (!reduce) dpoly.style.transform = "scale(1)";
      });
    }

    /* ---------- technology footprint bars ---------- */
    if (bars) {
      bars.innerHTML = "";
      const freq: Record<string, number> = {};
      PROJECTS.forEach((p) => p.tech.forEach((t) => (freq[t] = (freq[t] || 0) + 1)));
      const arr = Object.keys(freq)
        .map((k) => ({ k, v: freq[k] }))
        .sort((a, b) => b.v - a.v)
        .slice(0, 8);
      const max = arr[0]?.v || 1;
      arr.forEach((d) => {
        const row = document.createElement("div");
        row.className = "bar-row";
        row.innerHTML =
          `<span class="bl">${d.k}</span>` +
          `<div class="bar-track"><div class="bar-fill" data-w="${Math.round((d.v / max) * 100)}"></div></div>` +
          `<span class="bv">${d.v}</span>`;
        bars.appendChild(row);
      });
      reveals.push(() => {
        bars.querySelectorAll<HTMLElement>(".bar-fill").forEach((f) => {
          f.style.width = `${f.getAttribute("data-w")}%`;
        });
      });
    }

    /* ---------- project-mix donut ---------- */
    if (donut) {
      donut.innerHTML = "";
      if (legend) legend.innerHTML = "";
      const counts: Partial<Record<Category, number>> = {};
      PROJECTS.forEach((p) => (counts[p.cat] = (counts[p.cat] || 0) + 1));
      const cats = Object.keys(counts) as Category[];
      const total = PROJECTS.length;
      const cx = 90;
      const cy = 90;
      const r = 62;
      const circ = 2 * Math.PI * r;
      let offset = 0;
      const bg = document.createElementNS(NS, "circle");
      bg.setAttribute("cx", String(cx));
      bg.setAttribute("cy", String(cy));
      bg.setAttribute("r", String(r));
      bg.setAttribute("fill", "none");
      bg.setAttribute("stroke", "rgba(126,148,178,.10)");
      bg.setAttribute("stroke-width", "18");
      donut.appendChild(bg);
      const segs: SVGCircleElement[] = [];
      cats.forEach((cat) => {
        const frac = (counts[cat] || 0) / total;
        const len = circ * frac;
        const seg = document.createElementNS(NS, "circle");
        seg.setAttribute("cx", String(cx));
        seg.setAttribute("cy", String(cy));
        seg.setAttribute("r", String(r));
        seg.setAttribute("fill", "none");
        seg.setAttribute("stroke", CAT_COLOR[cat] || "#5B8CFF");
        seg.setAttribute("stroke-width", "18");
        seg.setAttribute("stroke-dasharray", `${len} ${circ - len}`);
        seg.setAttribute("stroke-dashoffset", String(-offset));
        seg.setAttribute("transform", `rotate(-90 ${cx} ${cy})`);
        if (!reduce) {
          seg.style.opacity = "0";
          seg.style.transition = "opacity .6s ease";
        }
        donut.appendChild(seg);
        segs.push(seg);
        offset += len;
        if (legend) {
          const sp = document.createElement("span");
          sp.innerHTML = `<i style="background:${CAT_COLOR[cat] || "#5B8CFF"}"></i>${cat} · ${counts[cat]}`;
          legend.appendChild(sp);
        }
      });
      const ctxt = document.createElementNS(NS, "text");
      ctxt.setAttribute("x", String(cx));
      ctxt.setAttribute("y", String(cy - 4));
      ctxt.setAttribute("text-anchor", "middle");
      ctxt.setAttribute("fill", "#E8EDF4");
      ctxt.setAttribute("font-family", "Space Grotesk, sans-serif");
      ctxt.setAttribute("font-size", "26");
      ctxt.setAttribute("font-weight", "600");
      ctxt.textContent = String(total);
      donut.appendChild(ctxt);
      const csub = document.createElementNS(NS, "text");
      csub.setAttribute("x", String(cx));
      csub.setAttribute("y", String(cy + 14));
      csub.setAttribute("text-anchor", "middle");
      csub.setAttribute("fill", "#5D6779");
      csub.setAttribute("font-family", "JetBrains Mono, monospace");
      csub.setAttribute("font-size", "8");
      csub.setAttribute("letter-spacing", "1.5");
      csub.textContent = "PROJECTS";
      donut.appendChild(csub);
      reveals.push(() => {
        segs.forEach((s, i) => {
          setTimeout(() => {
            s.style.opacity = "1";
          }, reduce ? 0 : i * 120);
        });
      });
    }

    /* ---------- reveal on scroll ---------- */
    const section = sectionRef.current;
    let io: IntersectionObserver | null = null;
    if (section && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (ents) => {
          ents.forEach((e) => {
            if (e.isIntersecting) {
              reveals.forEach((fn) => fn());
              io?.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );
      io.observe(section);
    } else {
      reveals.forEach((fn) => fn());
    }

    return () => {
      io?.disconnect();
      if (radar) radar.innerHTML = "";
      if (bars) bars.innerHTML = "";
      if (donut) donut.innerHTML = "";
      if (legend) legend.innerHTML = "";
    };
  }, [reduce]);

  return (
    <section className="section" id="inside" ref={sectionRef}>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">inside the data</p>
          <h2>The shape of the work.</h2>
          <p>
            A few honest views of my focus — derived from the projects above and my own
            self-assessment, not invented statistics.
          </p>
        </div>
        <div className="data-grid">
          <div className="panel reveal" data-chart="radar">
            <h3>Focus radar</h3>
            <p className="cap">self-assessed emphasis across domains</p>
            <div className="radar-wrap">
              <svg
                id="radar"
                ref={radarRef}
                viewBox="0 0 320 300"
                role="img"
                aria-label="Radar chart of focus across Programming, Data Science, Machine Learning, AI and NLP, SQL and DSA, and BI and Visualization"
              />
            </div>
          </div>
          <div className="panel reveal" data-d="1" data-chart="bars">
            <h3>Technology footprint</h3>
            <p className="cap">how often each tool appears across the projects</p>
            <div id="techbars" ref={barsRef} />
          </div>
          <div className="panel panel--wide reveal" data-d="2" data-chart="donut">
            <h3>Project mix by discipline</h3>
            <p className="cap">distribution of the featured projects</p>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "34px", alignItems: "center" }}>
              <svg
                id="donut"
                ref={donutRef}
                viewBox="0 0 180 180"
                width="180"
                height="180"
                role="img"
                aria-label="Donut chart of project distribution by discipline"
              />
              <div className="legend" id="donut-legend" ref={legendRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
