import * as preact from "preact";
import * as server from "@app/server";

export async function fetch(route: string, prefix: string) {
  return server.GetVisits({});
}

export function view(
  route: string,
  prefix: string,
  data: server.VisitsResponse,
): preact.ComponentChild {
  return (
    <div>
      <h2>Visits</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Path</th>
              <th>IP</th>
              <th>User Agent</th>
              <th>Referrer</th>
            </tr>
          </thead>
          <tbody>
            {data.Visits?.map((visit, index) => (
              <tr key={index}>
                <td>{new Date(visit.Timestamp).toLocaleString()}</td>
                <td>{visit.Path}</td>
                <td>{visit.Ip}</td>
                <td
                  style={{
                    maxWidth: 300,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {visit.UserAgent}
                </td>
                <td>{visit.Referrer || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
