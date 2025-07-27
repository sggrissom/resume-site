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
      <Header />
      <Blurb />
      <Actions />
    </div>
  );
}

const Avatar = () => (
  <img src="/images/avatar.JPEG" alt="Steven Grissom" className="avatar" />
);

const Header = () => (
  <header>
    <Avatar />
    <h1>Steven Grissom</h1>
    <p className="subtitle">Senior Software Engineer</p>
  </header>
);

const Blurb = () => (
  <section className="blurb">
    <p>
      Senior software engineer with 11+ years of experience. I find joy in
      programming done well. I value high performance and good architecture.
    </p>
    <p>
      GitHub is just some hobby or experimental work—nothing flashy, but feel
      free to poke around.
    </p>
  </section>
);

interface ActionLinkProps {
  href: string;
  label: string;
  primary?: boolean;
}

const ActionLink = ({ href, label, primary = false }: ActionLinkProps) => (
  <a
    href={href}
    className={primary ? "button" : undefined}
    target="_blank"
    rel="noopener noreferrer"
  >
    {label}
  </a>
);

const Actions = () => (
  <section className="actions">
    <ActionLink
      href="/static/steven-grissom-resume.pdf"
      label="Resume"
      primary
    />
    <ActionLink
      href="https://www.linkedin.com/in/steven-grissom/"
      label="LinkedIn"
    />
    <ActionLink href="https://github.com/sggrissom" label="GitHub" />
  </section>
);
