"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Category, type Project } from "@/data/content";
import ProjectViz from "./ProjectViz";

const FILTERS: { label: string; value: Category | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Machine Learning", value: "Machine Learning" },
  { label: "Data Analytics", value: "Data Analytics" },
  { label: "AI", value: "AI" },
  { label: "Software", value: "Software" },
];

const countFor = (v: Category | "all") =>
  v === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.cat === v).length;

export default function Projects() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = (id: string) => {
    lastFocus.current = (document.activeElement as HTMLElement) ?? null;
    setOpenId(id);
  };
  const close = useCallback(() => {
    setOpenId(null);
    lastFocus.current?.focus?.();
  }, []);

  const active = openId ? PROJECTS.find((p) => p.id === openId) : undefined;

  return (
    <section className="section" id="projects">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">projects</p>
          <h2>Selected work.</h2>
          <p>
            Each project starts with a real problem and ends with something that runs. Filter by
            discipline, or open a case study for the full breakdown.
          </p>
        </div>

        <div className="proj-bar reveal" data-d="1" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className="filter"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
            >
              {f.label} <span className="c">({countFor(f.value)})</span>
            </button>
          ))}
        </div>

        <div className="proj-grid" id="proj-grid">
          {PROJECTS.map((p, i) => {
            const hasStudy = Boolean(p.study);
            const hidden = filter !== "all" && p.cat !== filter;
            return (
              <article
                key={p.id}
                className={"card reveal" + (hidden ? " hide" : "")}
                data-cat={p.cat}
                data-id={p.id}
                data-d={i % 2 ? "1" : undefined}
                style={hasStudy ? { cursor: "pointer" } : undefined}
                onClick={
                  hasStudy
                    ? (e) => {
                        if ((e.target as HTMLElement).closest("[data-stop]")) return;
                        open(p.id);
                      }
                    : undefined
                }
              >
                <div className="card__viz">
                  <ProjectViz id={p.id} />
                  <span className="card__cat">{p.cat}</span>
                </div>
                <div className="card__body">
                  <h3>{p.name}</h3>
                  <div className="card__tag">{p.tag}</div>
                  <p className="card__desc">{p.desc}</p>
                  <div className="card__tech">
                    {p.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="card__foot">
                    <a
                      className="card__link"
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-stop
                      onClick={(e) => e.stopPropagation()}
                    >
                      Code <ArrowUpRight aria-hidden="true" />
                    </a>
                    {hasStudy && (
                      <button
                        className="card__more"
                        data-study={p.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          open(p.id);
                        }}
                      >
                        Case study <ArrowUpRight aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {active?.study && <CaseStudyModal project={active} onClose={close} />}
    </section>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const study = project.study!;

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && panel) {
        const f = panel.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const blocks: [string, string][] = [
    ["Problem", study.problem],
    ["Data", study.data],
    ["Approach", study.approach],
    ["Modeling", study.modeling],
    ["Evaluation", study.evaluation],
    ["Result", study.result],
  ];

  return (
    <div
      className="modal open"
      id="modal"
      aria-hidden="false"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cs-title"
    >
      <div className="modal__scrim" data-close onClick={onClose} />
      <div className="modal__panel" id="modal-panel" tabIndex={-1} ref={panelRef}>
        <button className="modal__close" data-close aria-label="Close case study" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <div id="modal-content">
          <p className="cs__cat">{project.cat} · case study</p>
          <h2 className="cs__title" id="cs-title">
            {project.name}
          </h2>
          <p className="cs__lead">{project.desc}</p>
          <div className="cs__stack">
            {project.tech.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          {blocks.map(([k, v]) => (
            <div className="cs__block" key={k}>
              <div className="cs__k">{k}</div>
              <div className="cs__v">{v}</div>
            </div>
          ))}
          <div className="cs__cta">
            <a className="btn btn--primary" href={project.repo} target="_blank" rel="noopener noreferrer">
              View on GitHub <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <p className="cs__note">
            Note: figures are reported only where a project has finalised, verified results. This
            portfolio deliberately avoids inventing metrics.
          </p>
        </div>
      </div>
    </div>
  );
}
