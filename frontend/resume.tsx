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

      <h1>{data.Name}</h1>

      <section className="summary">
        <p>{data.Summary}</p>
      </section>

      <section className="experience">
        <h3>Experience</h3>
        {data.Experience.map((exp) => (
          <div className="job">
            <h4>
              {exp.Role} – {exp.Company}
            </h4>
            <p>
              <em>{exp.Period}</em>
            </p>
            <ul className="bullets">
              {exp.Bullets.map((b) => (
                <li>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="skills">
        <h3>Skills</h3>
        <p>Languages: {data.Skills.Languages.join(", ")}</p>
        <p>Tools: {data.Skills.Tools.join(", ")}</p>
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
