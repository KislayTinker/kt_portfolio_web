export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="about__grid">
          <div className="about__bio">
            <p className="eyebrow reveal">about</p>
            <h2 className="reveal about__head" data-d="1">
              I work at the seam between data and decisions.
            </h2>
            <p className="reveal" data-d="2">
              I&apos;m a final-year <b>B.Tech (Information Technology)</b> student at Arya College of
              Engineering, Jaipur, focused on data science and machine learning. My work spans the
              full arc — from cleaning and exploring raw data to training models and shipping
              something people can actually use.
            </p>
            <p className="reveal" data-d="3">
              As a <b>Data Analytics intern at Coderbot Robotech</b>, I work hands-on with real
              datasets. Alongside coursework I&apos;ve solved <b>460+ problems on LeetCode</b>{" "}
              (including SQL), which keeps my fundamentals — data structures, algorithms and query
              design — sharp.
            </p>
            <div className="pipeline reveal" data-d="4" aria-label="My approach">
              <span className="node">
                <b>Curiosity</b>
              </span>
              <span className="sep">→</span>
              <span className="node">Data</span>
              <span className="sep">→</span>
              <span className="node">Insight</span>
              <span className="sep">→</span>
              <span className="node">Model</span>
              <span className="sep">→</span>
              <span className="node">
                <b>Impact</b>
              </span>
            </div>
          </div>
          <div className="metrics reveal" data-d="2" aria-label="Key metrics">
            <div className="metric">
              <div className="n">
                <span data-count="9.51" data-dec="2">
                  0
                </span>
              </div>
              <div className="l">CGPA / 10</div>
              <div className="sub">B.Tech IT</div>
            </div>
            <div className="metric">
              <div className="n">
                <span data-count="460">0</span>
                <span className="suffix">+</span>
              </div>
              <div className="l">LeetCode solved</div>
              <div className="sub">incl. SQL</div>
            </div>
            <div className="metric">
              <div className="n">
                <span data-count="7">0</span>
              </div>
              <div className="l">Featured projects</div>
              <div className="sub">ML · DA · AI</div>
            </div>
            <div className="metric">
              <div className="n">
                <span data-count="5">0</span>
              </div>
              <div className="l">Core domains</div>
              <div className="sub">DS · ML · AI · DA · BI</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
