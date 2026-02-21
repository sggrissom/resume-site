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
        <Builds />
        <Gallery />
        <AIWorkbench />
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
      well-architected. Over the last year I’ve been shipping products, modern
      web experiences, and automation that make teams move faster.
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

const Builds = () => (
  <section className="section">
    <h3>What I’ve been building lately</h3>
    <div className="build-grid">
      <div className="build-card">
        <h4>Product foundations</h4>
        <p>
          Led the creation of internal platform primitives (auth, observability,
          and deployment tooling) so new services ship in days instead of weeks.
        </p>
        <ul>
          <li>Unified developer templates across 5 teams</li>
          <li>Automated release pipelines with consistent guardrails</li>
        </ul>
      </div>
      <div className="build-card">
        <h4>Customer-facing experiences</h4>
        <p>
          Built front-end workflows that guide users through complex onboarding
          journeys with clear progress, helpful messaging, and quick wins.
        </p>
        <ul>
          <li>Reduced setup time by 40% with contextual UI</li>
          <li>Improved conversion with responsive, accessible flows</li>
        </ul>
      </div>
      <div className="build-card">
        <h4>Data &amp; automation</h4>
        <p>
          Designed resilient back-office automation to keep data in sync, enrich
          insights, and eliminate manual ops work.
        </p>
        <ul>
          <li>Built event-driven pipelines with retry + replay</li>
          <li>Scaled processing for millions of records daily</li>
        </ul>
      </div>
    </div>
  </section>
);

const Gallery = () => (
  <section className="section">
    <h3>Project gallery</h3>
    <p className="section-intro">
      A quick snapshot of the kinds of initiatives I love tackling—strategic
      thinking, technical depth, and polish for the end user.
    </p>
    <div className="project-grid">
      <article className="project-card">
        <img
          src="/images/product-foundations.svg"
          alt="Illustration of layered platform foundations"
          width="320"
          height="180"
          loading="lazy"
          decoding="async"
        />
        <div>
          <h4>Platform foundations</h4>
          <p>
            Laid down shared infrastructure that powers rapid shipping and
            consistent quality across teams.
          </p>
          <span className="project-meta">Architecture • DevEx • Reliability</span>
        </div>
      </article>
      <article className="project-card">
        <img
          src="/images/customer-experiences.svg"
          alt="Illustration of a user journey map"
          width="320"
          height="180"
          loading="lazy"
          decoding="async"
        />
        <div>
          <h4>Customer experiences</h4>
          <p>
            Crafted responsive, story-driven UIs that help customers activate
            quickly and feel supported along the way.
          </p>
          <span className="project-meta">UX • UI Engineering • Growth</span>
        </div>
      </article>
      <article className="project-card">
        <img
          src="/images/automation-insights.svg"
          alt="Illustration of automation workflows and data insights"
          width="320"
          height="180"
          loading="lazy"
          decoding="async"
        />
        <div>
          <h4>Automation + insights</h4>
          <p>
            Built durable pipelines that surface answers quickly and keep data
            trustworthy at scale.
          </p>
          <span className="project-meta">Pipelines • Analytics • Scale</span>
        </div>
      </article>
    </div>
  </section>
);

const AIWorkbench = () => (
  <section className="section ai-section">
    <div>
      <h3>How I use AI</h3>
      <p>
        I treat AI like a collaborative teammate: it accelerates discovery,
        sharpens documentation, and helps me explore alternative solutions
        without sacrificing quality or security.
      </p>
      <ul className="ai-list">
        <li>Rapidly prototype UI flows and refine copy alongside designers.</li>
        <li>Generate test cases, edge scenarios, and resilience checklists.</li>
        <li>
          Summarize complex logs, incidents, and metrics into actionable next
          steps.
        </li>
        <li>Document system decisions with crisp, searchable narratives.</li>
      </ul>
    </div>
    <div className="ai-card">
      <h4>My AI workflow</h4>
      <ol>
        <li>Frame the problem and desired outcome.</li>
        <li>Iterate quickly on options with human review.</li>
        <li>Harden the result with tests and guardrails.</li>
        <li>Ship the best version, then learn from feedback.</li>
      </ol>
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
