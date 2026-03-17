"use client";
export default function PassingFunctions({
  theFunction,
}: {
  theFunction: () => void;
}) {
  return (
    <div id="wd-passing-functions">
      <h2>Passing Functions</h2>
      <button onClick={theFunction} className="btn btn-primary" id="wd-pass-function-click">
        Invoke passed function
      </button>
      <hr />
    </div>
  );
}
