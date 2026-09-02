export default function Education() {
  return (
    <section className="section" id="education">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">education</p>
          <h2>Foundations.</h2>
        </div>
        <div className="edu reveal" data-d="1">
          <div className="edu__main">
            <h3 className="edu__deg">B.Tech, Information Technology</h3>
            <div className="edu__org">Arya College of Engineering, Jaipur</div>
            <p className="edu__meta">
              Final year · Focus on data science, machine learning and applied AI. Strong academic
              record alongside independent projects and competitive problem solving.
            </p>
          </div>
          <div className="edu__gpa">
            <div className="gpa-ring">
              <svg viewBox="0 0 150 150" width="150" height="150" aria-hidden="true">
                <circle
                  cx="75"
                  cy="75"
                  r="64"
                  fill="none"
                  stroke="rgba(126,148,178,.14)"
                  strokeWidth="10"
                />
                <circle
                  id="gpaArc"
                  cx="75"
                  cy="75"
                  r="64"
                  fill="none"
                  stroke="url(#gpaG)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  transform="rotate(-90 75 75)"
                  strokeDasharray="402"
                  strokeDashoffset="402"
                />
                <defs>
                  <linearGradient id="gpaG" x1="0" y1="0" x2="150" y2="150">
                    <stop stopColor="#5B8CFF" />
                    <stop offset="1" stopColor="#B18CFF" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="val">
                <b>
                  <span data-count="9.51" data-dec="2">
                    0
                  </span>
                </b>
                <small>CGPA / 10</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
