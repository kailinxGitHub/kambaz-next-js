"use client";

import { useEffect, useState } from "react";
import { fetchWelcomeMessage, getErrorMessage } from "./client";

export default function HttpClient() {
  const [welcome, setWelcome] = useState("Requesting on Load...");

  const loadWelcome = async () => {
    try {
      const message = await fetchWelcomeMessage();
      setWelcome(message);
    } catch (error) {
      setWelcome(getErrorMessage(error));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadWelcome();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="wd-lab5-http-client" className="mb-4">
      <h3>HTTP Client</h3>
      <button
        className="btn btn-primary mb-2"
        onClick={() => void loadWelcome()}
        id="wd-fetch-welcome"
      >
        Fetch Welcome
      </button>
      <p className="mb-0">{welcome}</p>
      <hr />
    </div>
  );
}
