"use client";

import { useEffect, useState } from "react";
import { fetchWelcomeMessage, getErrorMessage } from "./client";

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState("");
  const [welcomeOnLoad, setWelcomeOnLoad] = useState("");

  const fetchWelcomeOnClick = async () => {
    try {
      const message = await fetchWelcomeMessage();
      setWelcomeOnClick(message);
    } catch (error) {
      setWelcomeOnClick(getErrorMessage(error));
    }
  };

  const fetchWelcomeOnLoad = async () => {
    try {
      const message = await fetchWelcomeMessage();
      setWelcomeOnLoad(message);
    } catch (error) {
      setWelcomeOnLoad(getErrorMessage(error));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchWelcomeOnLoad();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="wd-lab5-http-client" className="mb-4">
      <h3>HTTP Client</h3>
      <h4>Requesting on Click</h4>
      <button
        className="btn btn-primary mb-2"
        onClick={() => void fetchWelcomeOnClick()}
        id="wd-fetch-welcome"
      >
        Fetch Welcome
      </button>
      <br />
      <span className="text-secondary">Response from server: </span>
      <b id="wd-fetch-welcome-on-click">{welcomeOnClick}</b>
      <hr />
      <h4>Requesting on Load</h4>
      <div role="status" aria-live="polite" aria-atomic="true" className="mb-2">
        <span className="text-secondary">Response from server: </span>
        <b id="wd-fetch-welcome-on-load">{welcomeOnLoad || "…"}</b>
      </div>
      <hr />
    </div>
  );
}
