import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import InsideData from "@/components/InsideData";
import DataPlayground from "@/components/DataPlayground";
import ProblemSolving from "@/components/ProblemSolving";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import GitHubSection from "@/components/GitHubSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <InsideData />
        <DataPlayground />
        <ProblemSolving />
        <Experience />
        <Education />
        <GitHubSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
