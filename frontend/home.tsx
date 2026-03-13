import * as preact from "preact";
import * as rpc from "vlens/rpc";
import * as core from "vlens/core";
import * as vlens from "vlens";
import { Header } from "./header";

type Data = {};

export async function fetch(route: string, prefix: string) {
  return rpc.ok<Data>({});
}

export function view(
  route: string,
  prefix: string,
  data: Data,
): preact.ComponentChild {
  return (
    <div>
      <Header isHome />
      <main id="app" class="app">
        <Hero />
        <Highlights />
        <Projects />
        <AIBlurb />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

const Avatar = () => (
  <picture>
    <source srcset="/images/avatar.webp" type="image/webp" />
    <img
      src="/images/avatar.jpg"
      width="96"
      height="98"
      alt="Steven Grissom"
      loading="lazy"
      decoding="async"
      className="avatar"
    />
  </picture>
);

const Hero = () => (
  <section className="hero">
    <Avatar />
    <div>
      <h1>Steven Grissom</h1>
      <h2>Senior Software Engineer • Distributed Systems • Web</h2>
      <Blurb />
      <div className="cta-row">
        <a className="btn btn-primary" href="/resume-page">
          View Resume
        </a>
        <a
          className="btn"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/resume/Steven-Grissom-Resume.pdf";
          }}
        >
          Download PDF
        </a>
      </div>
    </div>
  </section>
);

const Blurb = () => (
  <section className="blurb">
    <p>
      Welcome! I’m a husband, father, gardener, and home cook. I also happen to
      love programming, especially building systems that are fast, reliable, and
      well-architected.
    </p>
  </section>
);

const Highlights = () => (
  <section className="section split">
    <div className="card">
      <h3>Professional Highlights</h3>
      <ul>
        <li>
          Architected a Java-based backend automation pipeline to sync user
          profiles and auto-complete GCP trainings for thousands of learners
          across 200+ global tenants
        </li>

        <li>
          Engineered a C#/.NET Elasticsearch service, indexing 7 million+
          applications with sub-200 ms query latency
        </li>

        <li>
          Built a high-speed C++ parser for multi-gigabyte fault-log files,
          reducing processing time from 2 minutes to under 1 second
        </li>
      </ul>
    </div>

    <div className="card">
      <h3>Core Stack</h3>
      <div class="badges">
        <span className="badge">Java</span>
        <span className="badge">TypeScript</span>
        <span className="badge">JavaScript</span>
        <span className="badge">React</span>
        <span className="badge">MySQL</span>
        <span className="badge">AWS</span>
        <span className="badge">C#</span>
        <span className="badge">C++</span>
        <span className="badge">PHP</span>
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section className="section">
    <h3>Personal Projects</h3>
    <div className="projects-grid">
      <div className="card">
        <h4>Turn Taker</h4>
        <p className="card-desc">
          A small handheld embedded device built for my daughters to track
          whose turn it is to sit in the front seat. It maintains a
          score-based system that adjusts when a user defers or takes
          consecutive turns, and displays the current state on a small OLED
          screen.
        </p>
        <p className="card-section-label">Hardware</p>
        <ul className="card-list">
          <li>Microcontroller: Raspberry Pi Pico (RP2040)</li>
          <li>Display: 128×64 I²C OLED module</li>
          <li>Inputs: Two tactile push buttons + slide power switch</li>
          <li>Power: Single-cell LiPo with boost converter (5 V)</li>
          <li>PCB: Custom circular two-layer board designed in KiCad</li>
        </ul>
        <p className="card-section-label">Mechanical</p>
        <p className="card-desc">
          Enclosed in a 3D-printed handheld case with cutouts for the screen,
          buttons, and power switch, and internal space for the battery and
          wiring.
        </p>
        <div className="badges">
          <span className="badge">C++</span>
          <span className="badge">Embedded</span>
          <span className="badge">KiCad</span>
        </div>
      </div>

      <div className="card">
        <h4>Resume Site</h4>
        <p className="card-desc">
          This site — a minimalist, performance-conscious architecture that avoids heavy framework and database defaults in 
          favor of a smaller UI layer and application-managed persistence. Aiming for speed, small bundles, no bloat.
          Still some neat parts, like a parser so the Resume page always matches what's in my actual resume document.
        </p>
        <div className="badges">
          <span className="badge">Go</span>
          <span className="badge">TypeScript</span>
          <span className="badge">Preact</span>
        </div>
        <a
          href="https://github.com/sggrissom/resume-site"
          className="card-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          View →
        </a>
      </div>

      <div className="card">
        <h4>Another Project</h4>
        <p className="card-desc">
          describe another project
        </p>
        <div className="badges">
          <span className="badge">something</span>
        </div>
      </div>
    </div>
  </section>
);

const AIBlurb = () => (
  <section className="section">
    <h3>On AI</h3>
    <p className="section-body">
      AI is now ubiquotous in my profession. I feel like no one knows what the future holds, should I become a carpenter? (the answer is no)
    </p>
  </section>
);

const Contact = () => (
  <section className="section">
    <h3>Contact</h3>
    <div className="kv">
      <div>Email</div>
      <div>sggrissom@gmail.com</div>
      <div>GitHub</div>
      <div>
        <a
          href="https://github.com/sggrissom"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/sggrissom
        </a>
      </div>
      <div>LinkedIn</div>
      <div>
        <a
          href="https://www.linkedin.com/in/steven-grissom"
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin.com/in/steven-grissom
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="site-footer">
    <p>© {new Date().getFullYear()} Steven Grissom. All rights reserved.</p>
  </footer>
);
