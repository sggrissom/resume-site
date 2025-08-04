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
      <Header />
      <main id="app" class="app">
        <Hero />
        <Highlights />
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
      <h3>Highlights</h3>
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
    <p>
      © <span id="year">2025</span> Steven Grissom. All rights reserved.
    </p>
  </footer>
);
