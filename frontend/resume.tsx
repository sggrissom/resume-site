import * as preact from "preact";
import * as server from "@app/server";

export async function fetch(route: string, prefix: string) {
  return server.GetResume({});
}

export function view(
  route: string,
  prefix: string,
  data: server.ResumeResponse,
): preact.ComponentChild {
  return (
    <div className="container">
      <p>
        <a href="/">← Back to Home</a>
      </p>
      <p>
        <button
          className="button download"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/resume/resume.pdf";
          }}
        >
          ⬇ Download PDF
        </button>
      </p>
      <h1>{data.Name}</h1>
      <section className="summary">
        <p>{data.Summary}</p>
      </section>
      <section className="experience">
        <h3>Experience</h3>
        <div className="timeline">
          {data.Experience.map((exp) => (
            <div className="timeline-item">
              <time className="period">{exp.Period}</time>
              <div className="job-card">
                <h4>
                  {exp.Role} – {exp.Company}
                </h4>
                <p className="location">{exp.Location}</p>
                <ul className="bullets">
                  {exp.Bullets.map((b) => (
                    <li>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="skills">
        <h3>Skills</h3>
        <div className="skill-group">
          <h4>Languages</h4>
          <div className="tags">
            {data.Skills.Languages.map((lang) => (
              <span className="tag">{lang}</span>
            ))}
          </div>
        </div>
        <div className="skill-group">
          <h4>Tools</h4>
          <div className="tags">
            {data.Skills.Tools.map((tool) => (
              <span className="tag">{tool}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="education">
        <h3>Education</h3>
        <p>
          {data.Education.Degree}, {data.Education.School} (
          {data.Education.Period})
        </p>
      </section>
    </div>
  );
}
