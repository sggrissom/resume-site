import { block } from "vlens/css";

block(`
:root {
  --transition-speed: 0.3s;
}
`);

block(`
[data-theme="dark"] {
  --bg: #0f1216;
  --surface: #161a20;
  --text: #e6edf3;
  --muted: #94a3b8;
  --accent: #69db7c;
  --primary-accent: #38d9a9;
  --button-text: #0b141a;
  --border: #263041;
  --hero: #c9d4e0;
  --hover-bg: rgba(255, 255, 255, 0.1);
  --active-bg: rgba(255, 255, 255, 0.1);
  --active-text: #fff;
}
`);

block(`
html.theme-transition *,
html.theme-transition *::before,
html.theme-transition *::after {
  transition:
    background-color var(--transition-speed) ease,
    color            var(--transition-speed) ease,
    border-color     var(--transition-speed) ease,
    background-image var(--transition-speed) ease,
    filter           var(--transition-speed) ease,
    backdrop-filter  var(--transition-speed) ease !important;
}
`);

block(`
.btn-primary {
  transition:
    background-image var(--transition-speed) ease,
    filter var(--transition-speed) ease;
}
`);

block(`
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition: none !important;
  }
}
`);

block(`
* {
  box-sizing: border-box;
}
`);

block(`
html,
body {
  height: 100%;
}
`);

block(`
body {
  margin: 0;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Helvetica,
    Arial,
    "Apple Color Emoji",
    "Segoe UI Emoji";
  background: var(--bg);
  color: var(--text);
  font-size: var(--fs-base);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
`);

block(`
img {
  max-width: 100%;
  height: auto;
  display: block;
}
`);

block(`
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--surface);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}
`);

block(`
.nav {
  max-width: 1000px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
`);

block(`
.brand {
  color: var(--text);
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.3px;
  white-space: nowrap;
}
`);

block(`
.nav-links {
  list-style: none;
  display: flex;
  gap: 10px;
  margin: 0;
  padding: 0;
  align-items: center;
}
`);

block(`
.nav-links a, .nav-links button {
  color: var(--text);
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 8px;
  transition:
    background var(--transition-speed) ease,
    color var(--transition-speed) ease;
}
`);

block(`
.nav-links a.active {
  background-color: var(--active-bg);
  color: var(--active-text);
  font-weight: bold;
  pointer-events: none;
  user-select: none;
  cursor: default;
  border-radius: 8px;
}
`);

block(`
.nav-links a:hover, .nav-links button:hover {
  background: var(--hover-bg);
  color: var(--muted);
}
`);

block(`
.muted {
  background: var(--card-bg);
  color: var(--muted);
}
`);

block(`
.nav-toggle {
  display: none;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
  padding: 8px 10px;
  border-radius: 8px;
}
`);

block(`
.app {
  max-width: 1000px;
  padding: 22px 16px 72px;
  margin: 0 auto;
}
`);

block(`
.hero {
  display: grid;
  grid-template-columns: 170px 1fr;
  gap: 20px;
  align-items: center;
  padding: 22px 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
}
`);

block(`
.hero img {
  width: 170px;
  height: 170px;
  border-radius: 16px;
  object-fit: cover;
  border: 1px solid var(--border);
}
`);

block(`
.hero h1 {
  margin: 0 0 6px;
  font-size: var(--fs-1);
}
`);

block(`
.hero h2 {
  margin: 0 0 12px;
  font-size: var(--fs-2);
  font-weight: 500;
  color: var(--muted);
}
`);

block(`
.hero p {
  margin: 0 0 10px;
  line-height: 1.6;
  color: var(--hero);
}
`);

block(`
.cta-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
  flex-wrap: wrap;
}
`);

block(`
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 10px;
  text-decoration: none;
  color: var(--text);
  border: 1px solid var(--border);
  background: var(--bg);
  transition:
    transform 0.06s ease,
    background var(--transition-speed) ease;
  min-height: 44px; /* touch target */
}
`);

block(`
.btn:hover {
  background: var(--hover-bg);
  transform: none;
}
`);

block(`
.btn-primary {
  background: linear-gradient(90deg, var(--accent), var(--primary-accent));
  color: var(--button-text);
  border: none;
  font-weight: 700;
  transition: filter var(--transition-speed) ease;
}
`);

block(`
.btn-primary:hover {
  background: linear-gradient(
    90deg,
    var(--accent-hover),
    var(--primary-accent-hover)
  );
  filter: brightness(1.02);
  transform: none;
}
`);

block(`
.section {
  margin-top: 22px;
  padding: 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
}
`);

block(`
.section h3 {
  margin: 0 0 12px;
  font-size: var(--fs-2);
  letter-spacing: 0.2px;
}
`);

block(`
.kv {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 8px 14px;
}
`);

block(`
.kv div {
  padding: 8px 0;
  border-bottom: 1px dotted var(--border);
  color: var(--hero);
}
`);

block(`
.kv div:nth-child(odd) {
  color: var(--muted);
}
`);

block(`
.resume h1 {
  margin: 0 0 4px;
  font-size: 24px;
}
`);

block(`
.resume h2 {
  margin: 0 0 16px;
  font-size: 16px;
  color: var(--muted);
  font-weight: 500;
}
`);

block(`
.resume .meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  color: var(--hero);
  margin-bottom: 12px;
}
`);

block(`
.resume .download {
  margin-left: auto;
}
`);

block(`
.resume h3 {
  margin: 18px 0 8px;
  font-size: var(--fs-2);
}
`);

block(`
.resume ul {
  margin: 8px 0 0 18px;
  line-height: 1.6;
  color: var(--hero);
}
`);

block(`
.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}
`);

block(`
.badge {
  background: var(--card-bg);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
}
`);

block(`
.split {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
`);

block(`
@media (min-width: 840px) {
  .split {
    grid-template-columns: 1.3fr 0.8fr;
    gap: 16px;
  }
}
`);

block(`
@media (min-width: 840px) {
  .build-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .ai-section {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: start;
  }
}
`);

block(`
.card {
  margin-top: 6px;
  padding: 16px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
}
`);

block(`
.section-intro {
  margin: 0 0 16px;
  color: var(--hero);
  line-height: 1.6;
}
`);

block(`
.build-grid {
  display: grid;
  gap: 16px;
}
`);

block(`
.build-card {
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--card-bg);
}
`);

block(`
.build-card h4 {
  margin: 0 0 8px;
  font-size: 18px;
}
`);

block(`
.build-card p {
  margin: 0 0 12px;
  color: var(--hero);
  line-height: 1.6;
}
`);

block(`
.build-card ul {
  margin: 0 0 0 18px;
  color: var(--hero);
  line-height: 1.6;
}
`);

block(`
.project-grid {
  display: grid;
  gap: 16px;
}
`);

block(`
.project-card {
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  background: var(--card-bg);
  display: grid;
  gap: 12px;
}
`);

block(`
.project-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  background: #0b1118;
}
`);

block(`
.project-card h4 {
  margin: 0 0 8px;
  font-size: 18px;
  padding: 0 16px;
}
`);

block(`
.project-card p {
  margin: 0;
  padding: 0 16px;
  color: var(--hero);
  line-height: 1.6;
}
`);

block(`
.project-meta {
  display: block;
  margin: 12px 16px 16px;
  font-size: 12px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--muted);
}
`);

block(`
.ai-section {
  display: grid;
  gap: 18px;
}
`);

block(`
.ai-section p {
  margin: 0 0 12px;
  color: var(--hero);
  line-height: 1.6;
}
`);

block(`
.ai-list {
  margin: 0;
  padding-left: 18px;
  color: var(--hero);
  line-height: 1.6;
}
`);

block(`
.ai-card {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  background: var(--card-bg);
}
`);

block(`
.ai-card h4 {
  margin: 0 0 12px;
  font-size: 18px;
}
`);

block(`
.ai-card ol {
  margin: 0;
  padding-left: 18px;
  color: var(--hero);
  line-height: 1.6;
}
`);

block(`
@media (max-width: 640px) {
  .nav {
    padding: 10px 12px;
  }

  .nav-links {
    position: absolute;
    top: 56px;
    right: 12px;
    left: 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 8px;
    flex-direction: column;
    gap: 8px;
  }

  .hidden {
    display: none;
  }

  .nav-links a {
    display: block;
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 40px;
    padding: 8px 12px;
  }

  .brand {
    font-size: 16px;
  }

  .hero {
    grid-template-columns: 1fr;
    padding: 16px;
    gap: 14px;
    text-align: left;
  }

  .hero img {
    width: 120px;
    height: 120px;
    border-radius: 12px;
  }

  .hero h1 {
    font-size: 22px;
  }

  .hero h2 {
    font-size: 15px;
  }

  .app {
    padding: 18px 12px 64px;
  }

  .section {
    padding: 14px;
    border-radius: 12px;
  }

  .kv {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .kv div {
    border-bottom: 1px dotted var(--border);
    padding: 10px 0;
  }

  .resume .meta {
    gap: 8px 12px;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
`);

block(`
.site-footer {
  border-top: 1px solid var(--border);
  color: var(--muted);
  text-align: center;
  padding: 18px;
  background: var(--surface);
}
`);

// Analytics Dashboard Styles
block(`
.analytics-dashboard {
  max-width: 1000px;
  padding: 22px 16px 72px;
  margin: 0 auto;
}
`);

block(`
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
`);

block(`
.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}
`);

block(`
.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-accent);
  margin-bottom: 8px;
}
`);

block(`
.stat-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
}
`);

block(`
.stat-subtitle {
  font-size: 12px;
  color: var(--muted);
}
`);

block(`
.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}
`);

block(`
.analytics-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px;
}
`);

block(`
.analytics-card h3 {
  margin: 0 0 16px;
  font-size: 18px;
  color: var(--text);
}
`);

block(`
.chart-container {
  min-height: 200px;
}
`);

block(`
.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
`);

block(`
.bar-item {
  display: grid;
  grid-template-columns: 1fr 2fr 50px;
  gap: 12px;
  align-items: center;
}
`);

block(`
.bar-label {
  font-size: 12px;
  color: var(--text);
  text-align: right;
  padding-right: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
`);

block(`
.bar-container {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 4px;
  height: 20px;
  position: relative;
  overflow: hidden;
}
`);

block(`
.bar {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--primary-accent));
  border-radius: 3px;
  min-width: 2px;
  transition: width 0.3s ease;
}
`);

block(`
.bar-value {
  font-size: 12px;
  color: var(--muted);
  text-align: center;
  font-weight: 600;
}
`);

block(`
.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  color: var(--muted);
  font-style: italic;
}
`);

block(`
.analytics-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
  flex-wrap: wrap;
}
`);

// Analytics Dashboard Responsive Styles (media queries grouped together)
block(`
@media (max-width: 640px) {
  .analytics-dashboard {
    padding: 18px 12px 64px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .analytics-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .stat-value {
    font-size: 28px;
  }

  .bar-item {
    grid-template-columns: 1fr 3fr 40px;
    gap: 8px;
  }

  .bar-label {
    font-size: 11px;
  }

  .bar-value {
    font-size: 11px;
  }

  .analytics-actions .btn {
    width: 100%;
    justify-content: center;
  }
}
`);

// Enhanced Sessions and Visits Page Styles
block(`
.sessions-page, .visits-page {
  max-width: 1200px;
  padding: 22px 16px 72px;
  margin: 0 auto;
}
`);

block(`
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}
`);

block(`
.page-header h2 {
  margin: 0;
  color: var(--text);
}
`);

block(`
.filters {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  flex-wrap: wrap;
}
`);

block(`
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
`);

block(`
.filter-group label {
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
}
`);

block(`
.search-input {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
  font-size: 14px;
  min-width: 300px;
}
`);

block(`
.search-input:focus {
  outline: none;
  border-color: var(--primary-accent);
  box-shadow: 0 0 0 2px rgba(56, 217, 169, 0.1);
}
`);

block(`
.filter-group select {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
  font-size: 14px;
  min-width: 150px;
}
`);

block(`
.filter-group select:focus {
  outline: none;
  border-color: var(--primary-accent);
}
`);

block(`
.table-container {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
}
`);

block(`
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
`);

block(`
.data-table th {
  background: var(--bg);
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid var(--border);
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
}
`);

block(`
.data-table th.sortable {
  cursor: pointer;
  user-select: none;
}
`);

block(`
.data-table th.sortable:hover {
  background: var(--hover-bg);
}
`);

block(`
.data-table td {
  padding: 10px 8px;
  border-bottom: 1px solid var(--border);
  color: var(--text);
  vertical-align: top;
}
`);

block(`
.data-table tr:hover {
  background: var(--hover-bg);
}
`);

block(`
.data-table tr.bot-session {
  background: rgba(255, 193, 7, 0.05);
}
`);

block(`
.data-table .numeric {
  text-align: right;
  font-weight: 600;
}
`);

block(`
.data-table .monospace {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
}
`);

block(`
.data-table .user-agent {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  color: var(--muted);
}
`);

block(`
.data-table .path-cell {
  min-width: 120px;
}
`);

block(`
.data-table .path-display {
  font-weight: 600;
}
`);

block(`
.data-table .path-full {
  font-size: 11px;
  color: var(--muted);
  margin-left: 4px;
}
`);

block(`
.data-table .referrer-cell {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}
`);

block(`
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
`);

block(`
.badge.bot {
  background: rgba(255, 193, 7, 0.2);
  color: #856404;
}
`);

block(`
.badge.human {
  background: rgba(40, 167, 69, 0.2);
  color: #155724;
}
`);

block(`
.badge.mobile {
  background: rgba(23, 162, 184, 0.2);
  color: #0c5460;
}
`);

block(`
.badge.desktop {
  background: rgba(108, 117, 125, 0.2);
  color: #495057;
}
`);

block(`
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
}
`);

block(`
.pagination-info {
  color: var(--muted);
  font-size: 14px;
  font-weight: 500;
}
`);

block(`
.pagination .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
`);

// Sessions and Visits Responsive Styles (media queries grouped together)
block(`
@media (max-width: 768px) {
  .sessions-page, .visits-page {
    padding: 18px 12px 64px;
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;
  }

  .filters {
    flex-direction: column;
    gap: 12px;
  }

  .search-input {
    min-width: auto;
    width: 100%;
  }

  .filter-group select {
    min-width: auto;
    width: 100%;
  }

  .table-container {
    overflow-x: auto;
  }

  .data-table {
    min-width: 800px;
  }

  .data-table th,
  .data-table td {
    padding: 8px 6px;
  }

  .data-table .user-agent {
    max-width: 150px;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 12px;
  }
}
`);
