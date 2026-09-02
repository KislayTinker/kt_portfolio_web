import { ArrowUpRight, Github, GitFork } from "lucide-react";
import { CAT_COLOR, PROJECTS, REPO_ORDER, SITE } from "@/data/content";

export default function GitHubSection() {
  const repos = REPO_ORDER.map((id) => PROJECTS.find((p) => p.id === id)).filter(
    (p): p is (typeof PROJECTS)[number] => Boolean(p)
  );

  return (
    <section className="section" id="github">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">open source</p>
          <h2>The work lives on GitHub.</h2>
          <p>
            Every project here is backed by code. Browse the repositories, read the notebooks, and
            see how each system is put together.
          </p>
        </div>
        <div className="gh reveal" data-d="1">
          <div className="gh__top">
            <div className="gh__id">
              <div className="av" aria-hidden="true">
                <Github />
              </div>
              <div>
                <h3>{SITE.name}</h3>
                <a className="handle" href={SITE.github} target="_blank" rel="noopener noreferrer">
                  {SITE.githubHandle}
                </a>
              </div>
            </div>
            <a className="btn btn--primary" href={SITE.github} target="_blank" rel="noopener noreferrer">
              View GitHub profile <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <div className="gh__repos">
            {repos.map((p) => (
              <a
                key={p.id}
                className="repo"
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="rn">
                  <GitFork aria-hidden="true" />
                  {p.name}
                </div>
                <div className="rd">{p.desc}</div>
                <div className="rl">
                  <i>
                    <b style={{ background: CAT_COLOR[p.cat] }} />
                    {p.tech[0]}
                  </i>
                  <i>{p.cat}</i>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
