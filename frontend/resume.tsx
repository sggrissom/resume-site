import * as preact from "preact";
import * as server from "@app/server";
import { Header } from "./header";
import { FunctionalComponent } from "preact";

export async function fetch(route: string, prefix: string) {
  return server.GetResume({});
}

export function view(
  route: string,
  prefix: string,
  data: server.ResumeResponse,
): preact.ComponentChild {
  return (
    <div>
      <Header />
      <main id="app" class="app">
        <div className="resume">
          <Summary data={data} />
          <Experience data={data} />
          <div className="section split">
            <Skills data={data} />
            <Education data={data} />
          </div>
        </div>
      </main>
    </div>
  );
}

interface ResumeProps {
  data: server.ResumeResponse;
}

const Summary: FunctionalComponent<ResumeProps> = ({ data }) => (
  <div className="section">
    <div className="meta">
      <div>
        <h1>{data.Name}</h1>
        <h2>Senior Software Engineer</h2>
      </div>
      <div className="download" style="margin-left:auto;">
        <a
          className="btn btn-primary"
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
    <div className="kv">
      <div>Email</div>
      <div>{data.Title.split("|")[0]}</div>
      <div>Website</div>
      <div>{data.Title.split("|")[1]}</div>
    </div>
  </div>
);

const Experience: FunctionalComponent<ResumeProps> = ({ data }) => (
  <div className="section">
    <h3>Experience</h3>

    {data.Experience.map((job) => (
      <div className="card">
        <strong>{job.Role}</strong> — {job.Company}
        <div className="muted" style="margin-top:4px;">
          {job.Period}
        </div>
        <div className="muted" style="margin-top:4px;">
          {job.Location}
        </div>
        <ul>
          {job.Bullets.map((bullet) => (
            <li>{bullet}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const Skills: FunctionalComponent<ResumeProps> = ({ data }) => (
  <div>
    <h3>Skills</h3>
    <div className="badges">
      {data.Skills.Languages.map((skill) => (
        <span className="badge">{skill}</span>
      ))}
      {data.Skills.Tools.map((skill) => (
        <span className="badge">{skill}</span>
      ))}
    </div>
  </div>
);

const Education: FunctionalComponent<ResumeProps> = ({ data }) => (
  <div>
    <h3>Education</h3>
    <div className="card">
      {data.Education.Degree} — {data.Education.School}
      <div className="muted">
        {data.Education.Period}
      </div>
    </div>
  </div>
);
