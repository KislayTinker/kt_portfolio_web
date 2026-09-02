export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">experience</p>
          <h2>Where I&apos;ve applied it.</h2>
        </div>
        <div className="tl">
          <div className="tl__item reveal">
            <div className="tl__when">
              Internship<span className="role-tag">// current focus</span>
            </div>
            <div className="tl__what">
              <h3>Data Analytics Intern</h3>
              <div className="tl__org">Coderbot Robotech Pvt. Ltd.</div>
              <p>
                Working hands-on with real-world datasets — cleaning, exploring and structuring
                data, and turning it into clear, usable insight to support decisions.
              </p>
              <div className="chips">
                <span>Data cleaning</span>
                <span>Exploratory analysis</span>
                <span>Visualization</span>
                <span>Insight reporting</span>
              </div>
            </div>
          </div>
          <div className="tl__item reveal" data-d="1">
            <div className="tl__when">
              Ongoing<span className="role-tag">// research direction</span>
            </div>
            <div className="tl__what">
              <h3>Multimodal Fake-News Detection</h3>
              <div className="tl__org">Independent research project</div>
              <p>
                Building a system that detects misinformation by analysing text and images together
                — pairing a Vision Transformer with BERT and modelling cross-modal inconsistency
                between what a post says and what it shows.
              </p>
              <div className="chips">
                <span>ViT</span>
                <span>BERT</span>
                <span>Multimodal ML</span>
                <span>Cross-modal analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
