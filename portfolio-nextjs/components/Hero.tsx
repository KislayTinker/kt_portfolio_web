import { ArrowRight } from "lucide-react";
import NotebookCard from "./NotebookCard";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__veil" aria-hidden="true" />
      <div className="wrap hero__inner hero__split">
        <div className="hero__copy">
          <p className="hero__kicker reveal">
            Kislay Tinker <span aria-hidden="true">·</span> <span className="pin">Jaipur, India</span>
          </p>
          <div className="reveal" data-d="1">
            <span className="status">
              <span className="dot" aria-hidden="true" />
              Open to Data Science / ML / Research roles
            </span>
          </div>
          <h1 className="hero__title reveal" data-d="2">
            <span>Turning data into decisions.</span>
            <span className="l2 grad-text">Building intelligence that matters.</span>
          </h1>
          <p className="hero__lead reveal" data-d="3">
            Final-year IT undergraduate and <b>Data Analytics intern</b> working across data science,
            machine learning and applied AI. I build systems that find signal in noise —{" "}
            <b>recommenders, predictive models, analytics and multimodal ML</b>.
          </p>
          <div className="hero__cta reveal" data-d="4">
            <a href="#projects" className="btn btn--primary">
              View projects <ArrowRight aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn--ghost">
              Let&apos;s connect
            </a>
          </div>
          <div className="hero__stats reveal" data-d="5">
            <div className="hero__stat">
              <div className="n">
                <span data-count="9.51" data-dec="2">
                  0
                </span>
              </div>
              <div className="l">CGPA / 10</div>
            </div>
            <div className="hero__stat">
              <div className="n">
                <span data-count="460">0</span>+
              </div>
              <div className="l">LeetCode solved</div>
            </div>
            <div className="hero__stat">
              <div className="n">
                <span data-count="8">0</span>
              </div>
              <div className="l">Featured projects</div>
            </div>
          </div>
        </div>
        <NotebookCard />
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <i />
        scroll
      </div>
    </section>
  );
}
