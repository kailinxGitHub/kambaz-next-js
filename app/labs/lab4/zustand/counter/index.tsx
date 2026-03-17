"use client";
import { useCounterStore } from "./store";

export default function ZustandCounter() {
  const { count, increase, decrease, setCount, reset } = useCounterStore();
  
  return (
    <div id="wd-zustand-counter">
      <h2>Zustand Counter</h2>
      <h3>{count}</h3>
      <div className="d-flex gap-2">
        <button onClick={() => increase(1)} className="btn btn-success" id="wd-zustand-counter-increase-click">
          Increase
        </button>
        <button onClick={() => decrease(1)} className="btn btn-danger" id="wd-zustand-counter-decrease-click">
          Decrease
        </button>
        <button onClick={() => setCount(10)} className="btn btn-primary" id="wd-zustand-counter-set-10-click">
          Set to 10
        </button>
        <button onClick={reset} className="btn btn-warning" id="wd-zustand-counter-reset-click">
          Reset
        </button>
      </div>
      <hr />
    </div>
  );
}
