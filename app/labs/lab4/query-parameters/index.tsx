"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function URLState() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");
  const router = useRouter();
  return (
    <div id="wd-url-encoding">
      <h2>URL State</h2>
      <input
        value={a}
        className="form-control mb-2"
        type="number"
        onChange={(e) => setA(e.target.value)}
      />
      <input
        value={b}
        className="form-control mb-2"
        type="number"
        onChange={(e) => setB(e.target.value)}
      />
      <button
        onClick={() => {
          const params = new URLSearchParams();
          params.append("a", a);
          params.append("b", b);
          router.push(`/labs/lab4/url-encoding/query-params?${params.toString()}`);
        }}
        className="btn btn-primary d-block mb-2 w-100"
      >
        Programmatic navigation to Query Params
      </button>
      <button
        onClick={() => {
          router.push(`/labs/lab4/url-encoding/path-params/${encodeURIComponent(a)}/${encodeURIComponent(b)}`);
        }}
        className="btn btn-primary d-block mb-2 w-100"
      >
        Programmatic navigation to Path Params
      </button>
      <hr />
      <Link href={`/labs/lab4/url-encoding/query-params?a=${a}&b=${b}`}>
        Navigate to Query Params ({a} + {b})
      </Link>
      <br />
      <Link
        href={`/labs/lab4/url-encoding/path-params/${encodeURIComponent(a)}/${encodeURIComponent(b)}`}
      >
        Navigate to Path Params ({a} + {b})
      </Link>
      <hr />
    </div>
  );
}
