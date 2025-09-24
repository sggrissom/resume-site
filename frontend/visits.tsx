import * as preact from "preact";
import * as vlens from "vlens";
import * as server from "@app/server";

export async function fetch(route: string, prefix: string) {
  return server.GetVisits({});
}

type SortColumn = "Timestamp" | "Path" | "Ip" | "Referrer";
type SortDirection = "asc" | "desc";

type VisitsState = {
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  searchTerm: string;
  filterPath: string;
  currentPage: number;
};

const useVisitsState = vlens.declareHook((): VisitsState => ({
  sortColumn: "Timestamp",
  sortDirection: "desc",
  searchTerm: "",
  filterPath: "",
  currentPage: 1,
}));

export function view(
  route: string,
  prefix: string,
  data: server.VisitsResponse,
): preact.ComponentChild {
  const state = useVisitsState();
  const itemsPerPage = 50;

  if (!data.Visits) {
    return <div>No visit data available</div>;
  }

  const sortColumnRef = vlens.ref(state, "sortColumn");
  const sortDirectionRef = vlens.ref(state, "sortDirection");
  const searchTermRef = vlens.ref(state, "searchTerm");
  const filterPathRef = vlens.ref(state, "filterPath");
  const currentPageRef = vlens.ref(state, "currentPage");

  // Get unique paths for filter dropdown
  const uniquePaths = [...new Set(data.Visits.map(v => v.Path))].sort();

  // Filter visits
  let filteredVisits = data.Visits.filter(visit => {
    const filterPath = vlens.refGet(filterPathRef);
    const searchTerm = vlens.refGet(searchTermRef);
    if (filterPath && visit.Path !== filterPath) return false;
    if (searchTerm &&
        !visit.Ip.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !visit.UserAgent.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !visit.Path.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !(visit.Referrer || "").toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Sort visits
  filteredVisits.sort((a, b) => {
    const sortColumn = vlens.refGet(sortColumnRef);
    const sortDirection = vlens.refGet(sortDirectionRef);
    let valueA: any = a[sortColumn];
    let valueB: any = b[sortColumn];

    if (sortColumn === "Timestamp") {
      valueA = new Date(valueA).getTime();
      valueB = new Date(valueB).getTime();
    } else if (typeof valueA === "string") {
      valueA = (valueA || "").toLowerCase();
      valueB = (valueB || "").toLowerCase();
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filteredVisits.length / itemsPerPage);
  const currentPage = vlens.refGet(currentPageRef);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVisits = filteredVisits.slice(startIndex, startIndex + itemsPerPage);

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

  const formatReferrer = (referrer: string) => {
    if (!referrer) return "Direct";
    try {
      const url = new URL(referrer);
      return url.hostname;
    } catch {
      return referrer.length > 30 ? referrer.substring(0, 30) + "..." : referrer;
    }
  };

  const getPathDisplayName = (path: string) => {
    switch (path) {
      case "/": return "Home";
      case "/resume-page": return "Resume";
      case "/analytics": return "Analytics";
      case "/sessions": return "Sessions";
      case "/visits": return "Visits";
      default: return path;
    }
  };

  return (
    <div className="visits-page">
      <div className="page-header">
        <h2>Visits ({filteredVisits.length} total)</h2>
        <a href="/analytics" className="btn">← Analytics Dashboard</a>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search IP, User Agent, Path, Referrer..."
            {...vlens.attrsBindInput(searchTermRef)}
            onInput={() => {
              vlens.refSet(currentPageRef, 1);
              vlens.scheduleRedraw();
            }}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label>Page:</label>
          <select
            value={vlens.refGet(filterPathRef)}
            onChange={(e) => {
              vlens.refSet(filterPathRef, (e.target as HTMLSelectElement).value);
              vlens.refSet(currentPageRef, 1);
              vlens.scheduleRedraw();
            }}
          >
            <option value="">All Pages</option>
            {uniquePaths.map((path) => (
              <option key={path} value={path}>
                {getPathDisplayName(path)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visits Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("Timestamp")} className="sortable">
                Time{getSortIcon("Timestamp")}
              </th>
              <th onClick={() => handleSort("Path")} className="sortable">
                Path{getSortIcon("Path")}
              </th>
              <th onClick={() => handleSort("Ip")} className="sortable">
                IP{getSortIcon("Ip")}
              </th>
              <th>User Agent</th>
              <th onClick={() => handleSort("Referrer")} className="sortable">
                Referrer{getSortIcon("Referrer")}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedVisits.map((visit, index) => (
              <tr key={index}>
                <td>{new Date(visit.Timestamp).toLocaleString()}</td>
                <td className="path-cell">
                  <span className="path-display">{getPathDisplayName(visit.Path)}</span>
                  {visit.Path !== getPathDisplayName(visit.Path) && (
                    <span className="path-full" title={visit.Path}>
                      ({visit.Path})
                    </span>
                  )}
                </td>
                <td className="monospace">{visit.Ip}</td>
                <td className="user-agent" title={visit.UserAgent}>
                  {visit.UserAgent}
                </td>
                <td className="referrer-cell" title={visit.Referrer || "Direct"}>
                  {formatReferrer(visit.Referrer)}
                </td>
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
