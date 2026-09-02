import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { SITE } from "@/data/content";

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <p className="eyebrow reveal" style={{ justifyContent: "center" }}>
          contact
        </p>
        <h2 className="reveal" data-d="1">
          Have a problem worth solving?
        </h2>
        <p className="reveal" data-d="2">
          I&apos;m looking for data science, machine learning and research opportunities — and
          I&apos;m always up for a good technical conversation. If you&apos;re building something
          that turns data into decisions, let&apos;s talk.
        </p>
        <div className="contact__links reveal" data-d="3">
          <a className="btn btn--primary" href={`mailto:${SITE.email}`}>
            <Mail aria-hidden="true" /> Email
          </a>
          <a className="btn" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin aria-hidden="true" /> LinkedIn
          </a>
          <a className="btn" href={SITE.github} target="_blank" rel="noopener noreferrer">
            <Github aria-hidden="true" /> GitHub
          </a>
        </div>
        <div className="contact__big reveal" data-d="4">
          <a href={`mailto:${SITE.email}`}>
            Say hello <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
