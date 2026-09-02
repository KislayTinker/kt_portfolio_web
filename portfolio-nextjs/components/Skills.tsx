"use client";

import { useState } from "react";
import {
  Code2,
  LineChart,
  Cpu,
  Sparkles,
  LayoutGrid,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SKILLS, SKILL_TO_PROJ, projectById, type IconName } from "@/data/content";

const ICONS: Record<IconName, LucideIcon> = {
  code: Code2,
  chart: LineChart,
  cpu: Cpu,
  spark: Sparkles,
  grid: LayoutGrid,
  tool: Wrench,
};

export default function Skills() {
  const [hot, setHot] = useState<string | null>(null);

  const note = (() => {
    if (!hot) return <>Hover a technology to trace it through the projects.</>;
    const names = (SKILL_TO_PROJ[hot] || [])
      .map((id) => projectById(id)?.name)
      .filter((n): n is string => Boolean(n));
    return names.length ? (
      <>
        <b>{hot}</b> powers: {names.join(" · ")}
      </>
    ) : (
      <>
        <b>{hot}</b> — part of my everyday toolkit
      </>
    );
  })();

  return (
    <section className="section" id="skills">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">skills</p>
          <h2>A stack built for the data lifecycle.</h2>
          <p>
            Grouped by where each tool lives in the workflow. Hover any technology to see which
            projects it powers.
          </p>
        </div>

        <div className="skills__grid" id="skills-grid">
          {SKILLS.map((cat) => {
            const Icon = ICONS[cat.icon];
            return (
              <div className="skillcat reveal" key={cat.name}>
                <h3>
                  <span className="ic" aria-hidden="true">
                    <Icon />
                  </span>
                  {cat.name}
                  <span className="cnt">{cat.items.length}</span>
                </h3>
                <div className="pills">
                  {cat.items.map((it) => {
                    const cls =
                      "pill" +
                      (hot && hot !== it ? " dim" : "") +
                      (hot === it ? " hot" : "");
                    return (
                      <span
                        className={cls}
                        key={it}
                        onMouseEnter={() => setHot(it)}
                        onMouseLeave={() => setHot(null)}
                      >
                        {it}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <p className="skill-note" id="skill-note" aria-live="polite">
          {note}
        </p>
      </div>
    </section>
  );
}
