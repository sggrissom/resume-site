import * as preact from "preact";
import * as server from "@app/server";

export async function fetch(route: string, prefix: string) {
  return server.GetSessions({});
}

export function view(
  route: string,
  prefix: string,
  data: server.SessionsResponse,
): preact.ComponentChild {
  return (
    <div>
      <h2>Sessions</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Request Count</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>IP</th>
              <th>User Agent</th>
              <th>Bot?</th>
              <th>Mobile?</th>
              <th>Platform</th>
              <th>Browser</th>
            </tr>
          </thead>
          <tbody>
            {data.Sessions?.map((session, index) => (
              <tr key={index}>
                <td>{session.RequestCount}</td>
                <td>{new Date(session.StartTime).toLocaleString()}</td>
                <td>{new Date(session.EndTime).toLocaleString()}</td>
                <td>{session.Ip}</td>
                <td
                  style={{
                    maxWidth: 300,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {session.UserAgent}
                </td>
                <td>{session.IsBot ? "Yes" : ""}</td>
                <td>{session.IsMobile ? "Yes" : ""}</td>
                <td>{session.Platform}</td>
                <td>{session.Browser}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
