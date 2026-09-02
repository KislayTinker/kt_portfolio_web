import { PROBLEM_TOPICS } from "@/data/content";

export default function ProblemSolving() {
  return (
    <section className="section" id="problem-solving">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">problem solving</p>
          <h2>Beyond data, I engineer solutions.</h2>
        </div>
        <div className="ps__grid">
          <div className="reveal">
            <div className="ps__big">
              <span data-count="460">0</span>
              <span className="plus">+</span>
            </div>
            <div className="ps__label">LeetCode problems solved · including SQL</div>
            <p className="ps__desc">
              Consistent problem solving keeps my engineering fundamentals sharp — the
              data-structure, algorithm and query intuition that makes the difference between a
              model that works in a notebook and a system that works in production.
            </p>
            <div className="ps__topics" aria-label="Topics practiced">
              {PROBLEM_TOPICS.map((t) => (
                <span className="t" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="reveal" data-d="1">
            <div className="ps__matrix" id="ps-matrix" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
