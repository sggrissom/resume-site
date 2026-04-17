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
      <Header activePage="home" />
      <main id="app" className="app">
        <Hero />
        <Highlights />
        <ProjectsTeaser />
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
      I’m a senior software engineer with experience building backend systems, distributed workflows, and performant applications. I enjoy designing software that is reliable, efficient, and simple to operate.
    </p>
  </section>
);

const Highlights = () => (
  <section className="section split">
    <div className="card">
      <h3>Professional Highlights</h3>
      <ul>
        <li>
          Architected a Java-based automation pipeline to synchronize user profiles and automate GCP training completion across 200+ global tenants
        </li>
        <li>
          Built an Elasticsearch-backed C# service indexing 7M+ applications with sub-200 ms query latency
        </li>
        <li>
          Developed a high-speed C++ parser for large fault-log files, reducing processing time from 2 minutes to under 1 second
        </li>
      </ul>
    </div>

    <div className="card">
      <h3>Core Stack</h3>
      <div className="badges">
        <span className="badge">Java</span>
        <span className="badge">TypeScript</span>
        <span className="badge">JavaScript</span>
        <span className="badge">React</span>
        <span className="badge">Go</span>
        <span className="badge">AWS</span>
        <span className="badge">C#</span>
        <span className="badge">C++</span>
        <span className="badge">PHP</span>
      </div>
    </div>
  </section>
);

const ProjectsTeaser = () => (
  <section className="section">
    <h3>Projects</h3>
    <p className="section-body">
      Case studies and side projects spanning real-time streaming, full-stack applications, and embedded hardware.
    </p>
    <a className="btn" href="/projects">
      View projects →
    </a>
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
