import * as vlens from "vlens";
import "./styles.ts";

async function main() {
  vlens.initRoutes([
    vlens.routeHandler("/resume-page", () => import("@app/resume")),
    vlens.routeHandler("/projects", () => import("@app/projects")),
    vlens.routeHandler("/sgg/analytics", () => import("@app/analytics")),
    vlens.routeHandler("/sgg/visits", () => import("@app/visits")),
    vlens.routeHandler("/sgg/sessions", () => import("@app/sessions")),
    vlens.routeHandler("/", () => import("@app/home")),
  ]);
}

main();
