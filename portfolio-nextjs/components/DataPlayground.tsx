"use client";

import { useEffect, useRef } from "react";

interface Pt {
  x: number;
  y: number;
  c: number;
}
interface Cent {
  x: number;
  y: number;
}

const COLORS = ["#5B8CFF", "#B18CFF", "#37D3E0", "#3FDD98", "#FFC24B", "#FF8FA3"];

export default function DataPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const kSliderRef = useRef<HTMLInputElement>(null);
  const kValRef = useRef<HTMLSpanElement>(null);
  const stepRef = useRef<HTMLButtonElement>(null);
  const runRef = useRef<HTMLButtonElement>(null);
  const reseedRef = useRef<HTMLButtonElement>(null);
  const roIterRef = useRef<HTMLDivElement>(null);
  const roInertiaRef = useRef<HTMLDivElement>(null);
  const roPtsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let pts: Pt[] = [];
    let cents: Cent[] = [];
    let k = 3;
    let iter = 0;
    let timer: number | null = null;

    const kValEl = kValRef.current;
    const roIter = roIterRef.current;
    const roInertia = roInertiaRef.current;
    const roPts = roPtsRef.current;

    function size() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height || 400;
      canvas!.width = Math.round(w * DPR);
      canvas!.height = Math.round(h * DPR);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    function gauss() {
      return (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2;
    }
    function seedPoints() {
      pts = [];
      const blobs = 4;
      const per = 60;
      const padX = w * 0.12;
      const padY = h * 0.14;
      for (let bI = 0; bI < blobs; bI++) {
        const bx = padX + Math.random() * (w - 2 * padX);
        const by = padY + Math.random() * (h - 2 * padY);
        const sd = Math.min(w, h) * 0.08;
        for (let i = 0; i < per; i++) {
          pts.push({ x: bx + gauss() * sd * 2, y: by + gauss() * sd * 2, c: -1 });
        }
      }
      pts.forEach((p) => {
        p.x = Math.max(6, Math.min(w - 6, p.x));
        p.y = Math.max(6, Math.min(h - 6, p.y));
      });
      if (roPts) roPts.textContent = String(pts.length);
    }
    function seedCents() {
      cents = [];
      const used: Record<number, number> = {};
      for (let i = 0; i < k; i++) {
        let idx: number;
        do {
          idx = Math.floor(Math.random() * pts.length);
        } while (used[idx] && Object.keys(used).length < pts.length);
        used[idx] = 1;
        cents.push({ x: pts[idx].x, y: pts[idx].y });
      }
      iter = 0;
      if (roIter) roIter.textContent = "0";
      if (roInertia) roInertia.textContent = "—";
    }
    function assign() {
      let inertia = 0;
      pts.forEach((p) => {
        let best = 0;
        let bd = Infinity;
        for (let i = 0; i < cents.length; i++) {
          const dx = p.x - cents[i].x;
          const dy = p.y - cents[i].y;
          const d = dx * dx + dy * dy;
          if (d < bd) {
            bd = d;
            best = i;
          }
        }
        p.c = best;
        inertia += bd;
      });
      return inertia;
    }
    function update() {
      let moved = 0;
      for (let i = 0; i < cents.length; i++) {
        let sx = 0;
        let sy = 0;
        let cnt = 0;
        pts.forEach((p) => {
          if (p.c === i) {
            sx += p.x;
            sy += p.y;
            cnt++;
          }
        });
        if (cnt) {
          const nx = sx / cnt;
          const ny = sy / cnt;
          moved += Math.abs(nx - cents[i].x) + Math.abs(ny - cents[i].y);
          cents[i].x = nx;
          cents[i].y = ny;
        }
      }
      return moved;
    }
    function draw() {
      ctx!.clearRect(0, 0, w, h);
      ctx!.strokeStyle = "rgba(126,148,178,.05)";
      ctx!.lineWidth = 1;
      for (let gx = 0; gx < w; gx += 40) {
        ctx!.beginPath();
        ctx!.moveTo(gx, 0);
        ctx!.lineTo(gx, h);
        ctx!.stroke();
      }
      for (let gy = 0; gy < h; gy += 40) {
        ctx!.beginPath();
        ctx!.moveTo(0, gy);
        ctx!.lineTo(w, gy);
        ctx!.stroke();
      }
      pts.forEach((p) => {
        const col = p.c < 0 ? "rgba(150,166,184,.55)" : COLORS[p.c % COLORS.length];
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 3.2, 0, 6.283);
        ctx!.fillStyle = col;
        ctx!.globalAlpha = p.c < 0 ? 0.6 : 0.85;
        ctx!.fill();
        ctx!.globalAlpha = 1;
      });
      cents.forEach((c, i) => {
        const col = COLORS[i % COLORS.length];
        ctx!.beginPath();
        ctx!.arc(c.x, c.y, 11, 0, 6.283);
        ctx!.strokeStyle = col;
        ctx!.lineWidth = 2.4;
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.arc(c.x, c.y, 4, 0, 6.283);
        ctx!.fillStyle = col;
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(c.x, c.y, 17, 0, 6.283);
        ctx!.strokeStyle = col;
        ctx!.globalAlpha = 0.25;
        ctx!.lineWidth = 1;
        ctx!.stroke();
        ctx!.globalAlpha = 1;
      });
    }
    function step() {
      const inertia = assign();
      const moved = update();
      iter++;
      if (roIter) roIter.textContent = String(iter);
      if (roInertia) roInertia.textContent = Math.round(inertia).toLocaleString();
      draw();
      return moved;
    }
    function stopRun() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      if (runRef.current) runRef.current.textContent = "Run";
    }
    function run() {
      if (timer) {
        stopRun();
        return;
      }
      if (reduce) {
        for (let i = 0; i < 12; i++) {
          if (step() < 0.4) break;
        }
        return;
      }
      if (runRef.current) runRef.current.textContent = "Pause";
      timer = window.setInterval(() => {
        const m = step();
        if (m < 0.4 || iter > 60) stopRun();
      }, 520);
    }
    function reseed() {
      stopRun();
      seedPoints();
      seedCents();
      assign();
      draw();
    }

    size();
    seedPoints();
    seedCents();
    assign();
    draw();

    const onSlider = (e: Event) => {
      k = parseInt((e.target as HTMLInputElement).value, 10);
      if (kValEl) kValEl.textContent = String(k);
      stopRun();
      seedCents();
      assign();
      draw();
    };
    const onStep = () => {
      stopRun();
      step();
    };
    const onRun = () => run();
    const onReseed = () => reseed();

    const slider = kSliderRef.current;
    const stepBtn = stepRef.current;
    const runBtn = runRef.current;
    const reseedBtn = reseedRef.current;
    slider?.addEventListener("input", onSlider);
    stepBtn?.addEventListener("click", onStep);
    runBtn?.addEventListener("click", onRun);
    reseedBtn?.addEventListener("click", onReseed);

    let started = false;
    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (ents) => {
          ents.forEach((e) => {
            if (e.isIntersecting) {
              if (!started) {
                started = true;
                reseed();
              }
            } else {
              stopRun();
            }
          });
        },
        { threshold: 0.2 }
      );
      io.observe(canvas);
    }

    let rt2: number | undefined;
    const onResize = () => {
      window.clearTimeout(rt2);
      rt2 = window.setTimeout(() => {
        size();
        reseed();
      }, 220);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stopRun();
      io?.disconnect();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(rt2);
      slider?.removeEventListener("input", onSlider);
      stepBtn?.removeEventListener("click", onStep);
      runBtn?.removeEventListener("click", onRun);
      reseedBtn?.removeEventListener("click", onReseed);
    };
  }, []);

  return (
    <section className="section section--tight" id="playground">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">data playground</p>
          <h2>Don&apos;t take my word for it — run a model.</h2>
          <p>
            A tiny <b style={{ color: "var(--text)" }}>K-Means</b> clustering algorithm, running
            live in your browser. The same idea behind my customer-segmentation work: find natural
            groups in unlabeled data.
          </p>
        </div>
        <div className="play reveal" data-d="1">
          <div className="play__grid">
            <div className="play__stage">
              <canvas
                className="play-canvas"
                ref={canvasRef}
                aria-label="Interactive K-Means clustering visualization"
              />
            </div>
            <div className="play__side">
              <div>
                <h3>K-Means, from scratch</h3>
                <p>
                  Points scatter into hidden blobs. K-Means guesses <em>k</em> cluster centers,
                  assigns each point to its nearest center, then moves the centers to the mean of
                  their members — repeating until things settle.
                </p>
              </div>
              <div className="ctl">
                <label htmlFor="kSlider">
                  Clusters &nbsp;
                  <b>
                    <span ref={kValRef}>3</span>
                  </b>
                </label>
                <input ref={kSliderRef} type="range" id="kSlider" min="2" max="6" defaultValue="3" step="1" />
              </div>
              <div className="play__btns">
                <button className="btn" ref={stepRef}>
                  Step
                </button>
                <button className="btn btn--primary" ref={runRef}>
                  Run
                </button>
                <button className="btn btn--ghost" ref={reseedRef}>
                  Re-seed
                </button>
              </div>
              <div className="play__readout">
                <div>
                  <div className="rk">Iteration</div>
                  <div className="rv" ref={roIterRef}>
                    0
                  </div>
                </div>
                <div>
                  <div className="rk">Inertia</div>
                  <div className="rv" ref={roInertiaRef}>
                    —
                  </div>
                </div>
                <div>
                  <div className="rk">Points</div>
                  <div className="rv" ref={roPtsRef}>
                    240
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
