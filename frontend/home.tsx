import * as preact from "preact";
import * as rpc from "vlens/rpc";
import * as core from "vlens/core";
import * as vlens from "vlens";

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
      <ThemeToggle />
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

interface ActionLinkProps {
  href: string;
  label: string;
  primary?: boolean;
}

const ActionLink = ({ href, label, primary = false }: ActionLinkProps) => (
  <a href={href} className={primary ? "button" : undefined}>
    {label}
  </a>
);

const Actions = () => (
  <section className="actions">
    <ActionLink href="/resume-page" label="Resume" primary />
    <ActionLink
      href="https://www.linkedin.com/in/steven-grissom/"
      label="LinkedIn"
    />
    <ActionLink href="https://github.com/sggrissom" label="GitHub" />
  </section>
);

type Theme = {
  value: string;
};

const useTheme = vlens.declareHook((): "dark" | "light" => {
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const themeValue = systemDark ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", themeValue);
  return {
    value: themeValue,
  };
});

const ThemeToggle = () => {
  let theme = useTheme();
  const themeRef = vlens.ref(theme, "value");
  return (
    <button
      onClick={vlens.cachePartial(themeToggleClicked, themeRef)}
      className="theme-switch"
    >
      {vlens.refGet(themeRef) === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

const themeToggleClicked = (themeRef: Ref) => {
  const next = vlens.refGet(themeRef) === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  vlens.refSet(themeRef, next);
  vlens.scheduleRedraw();
};
