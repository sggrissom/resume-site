import * as vlens from "vlens";
import "./styles.ts";

async function main() {
  vlens.initRoutes([
    vlens.routeHandler("/resume-page", () => import("@app/resume")),
    vlens.routeHandler("/analytics", () => import("@app/analytics")),
    vlens.routeHandler("/visits", () => import("@app/visits")),
    vlens.routeHandler("/sessions", () => import("@app/sessions")),
    vlens.routeHandler("/", () => import("@app/home")),
  ]);
}

main();
