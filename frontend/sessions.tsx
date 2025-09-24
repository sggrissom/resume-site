import * as preact from "preact";
import * as vlens from "vlens";
import * as server from "@app/server";

export async function fetch(route: string, prefix: string) {
  return server.GetSessions({});
}

type SortColumn = "RequestCount" | "StartTime" | "EndTime" | "Ip" | "Platform" | "Browser";
type SortDirection = "asc" | "desc";

type SessionsState = {
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  filterBot: "all" | "bots" | "humans";
  filterMobile: "all" | "mobile" | "desktop";
  searchTerm: string;
  currentPage: number;
};

const useSessionsState = vlens.declareHook((): SessionsState => ({
  sortColumn: "StartTime",
  sortDirection: "desc",
  filterBot: "all",
  filterMobile: "all",
  searchTerm: "",
  currentPage: 1,
}));

export function view(
  route: string,
  prefix: string,
  data: server.SessionsResponse,
): preact.ComponentChild {
  const state = useSessionsState();
  const itemsPerPage = 25;

  if (!data.Sessions) {
    return <div>No session data available</div>;
  }

  const sortColumnRef = vlens.ref(state, "sortColumn");
  const sortDirectionRef = vlens.ref(state, "sortDirection");
  const filterBotRef = vlens.ref(state, "filterBot");
  const filterMobileRef = vlens.ref(state, "filterMobile");
  const searchTermRef = vlens.ref(state, "searchTerm");
  const currentPageRef = vlens.ref(state, "currentPage");

  // Filter sessions
  let filteredSessions = data.Sessions.filter(session => {
    if (vlens.refGet(filterBotRef) === "bots" && !session.IsBot) return false;
    if (vlens.refGet(filterBotRef) === "humans" && session.IsBot) return false;
    if (vlens.refGet(filterMobileRef) === "mobile" && !session.IsMobile) return false;
    if (vlens.refGet(filterMobileRef) === "desktop" && session.IsMobile) return false;
    const searchTerm = vlens.refGet(searchTermRef);
    if (searchTerm && !session.Ip.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !session.UserAgent.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !session.Platform.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !session.Browser.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Sort sessions
  filteredSessions.sort((a, b) => {
    const sortColumn = vlens.refGet(sortColumnRef);
    const sortDirection = vlens.refGet(sortDirectionRef);
    let valueA: any = a[sortColumn];
    let valueB: any = b[sortColumn];

    if (sortColumn === "StartTime" || sortColumn === "EndTime") {
      valueA = new Date(valueA).getTime();
      valueB = new Date(valueB).getTime();
    } else if (typeof valueA === "string") {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const currentPage = vlens.refGet(currentPageRef);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSessions = filteredSessions.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (column: SortColumn) => {
    const currentSortColumn = vlens.refGet(sortColumnRef);
    const currentSortDirection = vlens.refGet(sortDirectionRef);

    if (currentSortColumn === column) {
      vlens.refSet(sortDirectionRef, currentSortDirection === "asc" ? "desc" : "asc");
    } else {
      vlens.refSet(sortColumnRef, column);
      vlens.refSet(sortDirectionRef, "asc");
    }
    vlens.refSet(currentPageRef, 1);
    vlens.scheduleRedraw();
  };

  const getSortIcon = (column: SortColumn) => {
    const currentSortColumn = vlens.refGet(sortColumnRef);
    const currentSortDirection = vlens.refGet(sortDirectionRef);
    if (currentSortColumn !== column) return " ↕️";
    return currentSortDirection === "asc" ? " ↑" : " ↓";
  };

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const diffMinutes = Math.round((end - start) / 60000);
    return diffMinutes === 0 ? "<1m" : `${diffMinutes}m`;
  };

  return (
    <div className="sessions-page">
      <div className="page-header">
        <h2>Sessions ({filteredSessions.length} total)</h2>
        <a href="/analytics" className="btn">← Analytics Dashboard</a>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search IP, User Agent, Platform, Browser..."
            {...vlens.attrsBindInput(searchTermRef)}
            onInput={() => {
              vlens.refSet(currentPageRef, 1);
              vlens.scheduleRedraw();
            }}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label>Type:</label>
          <select
            value={vlens.refGet(filterBotRef)}
            onChange={(e) => {
              vlens.refSet(filterBotRef, (e.target as HTMLSelectElement).value as any);
              vlens.refSet(currentPageRef, 1);
              vlens.scheduleRedraw();
            }}
          >
            <option value="all">All Sessions</option>
            <option value="humans">Human Only</option>
            <option value="bots">Bots Only</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Device:</label>
          <select
            value={vlens.refGet(filterMobileRef)}
            onChange={(e) => {
              vlens.refSet(filterMobileRef, (e.target as HTMLSelectElement).value as any);
              vlens.refSet(currentPageRef, 1);
              vlens.scheduleRedraw();
            }}
          >
            <option value="all">All Devices</option>
            <option value="mobile">Mobile Only</option>
            <option value="desktop">Desktop Only</option>
          </select>
        </div>
      </div>

      {/* Sessions Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("RequestCount")} className="sortable">
                Page Views{getSortIcon("RequestCount")}
              </th>
              <th onClick={() => handleSort("StartTime")} className="sortable">
                Start Time{getSortIcon("StartTime")}
              </th>
              <th onClick={() => handleSort("EndTime")} className="sortable">
                End Time{getSortIcon("EndTime")}
              </th>
              <th>Duration</th>
              <th onClick={() => handleSort("Ip")} className="sortable">
                IP{getSortIcon("Ip")}
              </th>
              <th>User Agent</th>
              <th>Type</th>
              <th>Device</th>
              <th onClick={() => handleSort("Platform")} className="sortable">
                Platform{getSortIcon("Platform")}
              </th>
              <th onClick={() => handleSort("Browser")} className="sortable">
                Browser{getSortIcon("Browser")}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedSessions.map((session, index) => (
              <tr key={index} className={session.IsBot ? "bot-session" : ""}>
                <td className="numeric">{session.RequestCount}</td>
                <td>{new Date(session.StartTime).toLocaleString()}</td>
                <td>{new Date(session.EndTime).toLocaleString()}</td>
                <td>{calculateDuration(session.StartTime, session.EndTime)}</td>
                <td className="monospace">{session.Ip}</td>
                <td className="user-agent" title={session.UserAgent}>
                  {session.UserAgent}
                </td>
                <td>
                  {session.IsBot ? (
                    <span className="badge bot">Bot</span>
                  ) : (
                    <span className="badge human">Human</span>
                  )}
                </td>
                <td>
                  {session.IsMobile ? (
                    <span className="badge mobile">Mobile</span>
                  ) : (
                    <span className="badge desktop">Desktop</span>
                  )}
                </td>
                <td>{session.Platform}</td>
                <td>{session.Browser}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => {
              vlens.refSet(currentPageRef, Math.max(1, currentPage - 1));
              vlens.scheduleRedraw();
            }}
            disabled={currentPage === 1}
            className="btn"
          >
            ← Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => {
              vlens.refSet(currentPageRef, Math.min(totalPages, currentPage + 1));
              vlens.scheduleRedraw();
            }}
            disabled={currentPage === totalPages}
            className="btn"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
