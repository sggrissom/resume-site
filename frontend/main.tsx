import * as vlens from "vlens";

async function main() {
  vlens.initRoutes([
    vlens.routeHandler("/resume-page", () => import("@app/resume")),
    vlens.routeHandler("/", () => import("@app/home")),
  ]);
}

main();
