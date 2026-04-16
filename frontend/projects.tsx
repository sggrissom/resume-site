import * as preact from "preact";
import * as rpc from "vlens/rpc";
import * as vlens from "vlens";
import { Header } from "./header";
import { DanceCaseStudy } from "./dance";
import { FamilyCaseStudy } from "./family";

type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    slug: "live-streaming",
    title: "Dance Class Live Streaming Platform",
    summary:
      "Multi-room streaming system for dance studios using Go, SRS, and FFmpeg. Supports RTSP cameras and mobile ingest via HLS delivery.",
    tags: ["Go", "FFmpeg", "HLS", "SRS"],
  },
  {
    slug: "turn-taker",
    title: "Turn Taker",
    summary:
      "A handheld embedded device. Custom PCB, 3D-printed enclosure, microcontroller, and hand built UI displayed on an OLED screen.",
    tags: ["C++", "Embedded", "KiCad"],
  },
  {
    slug: "family-portal",
    title: "Family Portal & iOS App",
    summary:
      "Full-stack system for managing family photos, growth measurements, and milestones. Includes a Go backend, Preact web frontend, and a native iOS app with local-first sync.",
    tags: ["Go", "Preact", "iOS", "Swift"],
  },
];

type Data = {
  projects: Project[];
  current: Project | null;
};

export async function fetch(route: string, prefix: string) {
  const slug = route.slice(prefix.length).replace(/^\//, "");
  const current = slug ? (PROJECTS.find((p) => p.slug === slug) ?? null) : null;
  return rpc.ok<Data>({ projects: PROJECTS, current });
}

export function view(
  route: string,
  prefix: string,
  data: Data,
): preact.ComponentChild {
  const slug = route.slice(prefix.length).replace(/^\//, "");
  if (slug) {
    return <DetailPage project={data.current} slug={slug} />;
  }
  return <ListPage projects={data.projects} />;
}

const ListPage = ({ projects }: { projects: Project[] }) => (
  <div>
    <Header activePage="projects" />
    <main id="app" class="app">
      <section className="section">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((p) => (
            <div className="card">
              <h4>{p.title}</h4>
              <p className="card-desc">{p.summary}</p>
              <div className="badges">
                {p.tags.map((tag) => (
                  <span className="badge">{tag}</span>
                ))}
              </div>
              <a href={`/projects/${p.slug}`} className="card-link">
                Read case study →
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  </div>
);

const DetailPage = ({
  project,
  slug,
}: {
  project: Project | null;
  slug: string;
}) => {
  if (!project) {
    return (
      <div>
        <Header activePage="projects" />
        <main id="app" class="app">
          <section className="section">
            <a href="/projects" className="card-link">
              ← Back to projects
            </a>
            <h2>Project not found</h2>
            <p className="muted">No project found for "{slug}".</p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header activePage="projects" />
      <main id="app" class="app">
        <section className="section">
          <a href="/projects" className="card-link">
            ← Back to projects
          </a>
          <h2>{project.title}</h2>
          <div className="badges" style="margin-bottom: 16px;">
            {project.tags.map((tag) => (
              <span className="badge">{tag}</span>
            ))}
          </div>
          {project.slug === "live-streaming" ? (
            <DanceCaseStudy />
          ) : project.slug === "family-portal" ? (
            <FamilyCaseStudy />
          ) : (
            <p className="muted">Case study coming soon.</p>
          )}
        </section>
      </main>
    </div>
  );
};
