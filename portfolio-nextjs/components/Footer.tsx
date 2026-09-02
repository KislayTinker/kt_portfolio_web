import { ArrowUp } from "lucide-react";
import { SITE } from "@/data/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap footer__row">
        <div className="c">© {year} Kislay Tinker · Designed &amp; built with care</div>
        <div className="footer__links">
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="#projects">Projects</a>
        </div>
        <a href="#home" className="totop">
          Back to top <ArrowUp aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
