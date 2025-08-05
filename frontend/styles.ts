import { block } from "vlens/css";

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
html.theme-transition body,
html.theme-transition .section,
html.theme-transition .hero,
html.theme-transition .card,
html.theme-transition .btn,
html.theme-transition .btn-primary {
  transition:
    background-color var(--transition-speed) ease,
    color            var(--transition-speed) ease,
    border-color     var(--transition-speed) ease,
    background-image var(--transition-speed) ease,
    filter           var(--transition-speed) ease;
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
    background 0.2s ease,
    color 0.2s ease;
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
    background 0.2s ease;
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
  transition: filter 0.2s ease;
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
.card {
  margin-top: 6px;
  padding: 16px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
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
  background: #0f131a;
}
`);
