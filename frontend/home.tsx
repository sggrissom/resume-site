import * as preact from "preact";
import * as rpc from "vlens/rpc";

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
    <div className="container">
      <header>
        <img
          src="/images/avatar.JPEG"
          alt="Steven Grissom"
          className="avatar"
        />
        <h1>Steven Grissom</h1>
        <p class="subtitle">Senior Software Engineer</p>
      </header>

      <section className="blurb">
        <p>
          Senior software engineer with 11+ years of experience. I find joy in
          programming done well. I value high performance and good architecture.
        </p>
        <p>
          Github is just some hobby or experimental work, nothing flashy, but
          feel free to poke around.
        </p>
      </section>

      <section className="actions">
        <a
          href="/static/steven-grissom-resume.pdf"
          className="button"
          target="_blank"
        >
          Resume
        </a>
        <a href="https://www.linkedin.com/in/steven-grissom/" target="_blank">
          LinkedIn
        </a>
        <a href="https://github.com/sggrissom" target="_blank">
          GitHub
        </a>
      </section>
    </div>
  );
}
