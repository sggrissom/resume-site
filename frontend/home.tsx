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
      </main>
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
            window.location.href = "/resume/resume.pdf";
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
    <p>
      My GitHub is mostly small projects, experiments, and some old school work.
      Nothing fancy; I stay busy with my day job. This site is there too if
      you're curious.
    </p>
  </section>
);
