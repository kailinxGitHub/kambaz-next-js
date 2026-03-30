import { HTTP_SERVER } from "./client";

export default function EnvironmentVariables() {
  return (
    <div id="wd-lab5-environment-variables" className="mb-4">
      <h3>Environment Variables</h3>
      <p className="mb-1">
        HTTP Server: <code>{HTTP_SERVER}</code>
      </p>
      <a
        href={`${HTTP_SERVER}/lab5/welcome`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open Lab 5 Welcome Route
      </a>
      <hr />
    </div>
  );
}
