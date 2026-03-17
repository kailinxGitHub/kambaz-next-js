"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function QueryParamsContent() {
  const searchParams = useSearchParams();
  const a = searchParams.get("a") || "0";
  const b = searchParams.get("b") || "0";
  const sum = parseFloat(a) + parseFloat(b);
  return (
    <div id="wd-query-params">
      <h3>Query Search Parameters</h3>
      <p>a = {a}</p>
      <p>b = {b}</p>
      <p>sum = {sum}</p>
    </div>
  );
}

export default function QueryParams() {
  return (
    <Suspense fallback={<div id="wd-query-params">Loading...</div>}>
      <QueryParamsContent />
    </Suspense>
  );
}
