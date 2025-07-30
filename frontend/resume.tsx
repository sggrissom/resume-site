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
    <>
      <div className={"container"}>
        <p>resume stuff: {data.Field}</p>
      </div>
    </>
  );
}
