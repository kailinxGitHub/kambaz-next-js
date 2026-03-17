"use client";
import { useParams } from "next/navigation";
export default function PathParams() {
  const params = useParams();
  const a = params.a as string;
  const b = params.b as string;
  const sum = parseFloat(a) + parseFloat(b);
  return (
    <div id="wd-path-params">
      <h3>Path Parameters</h3>
      <p>a = {a}</p>
      <p>b = {b}</p>
      <p>sum = {sum}</p>
    </div>
  );
}
