"use client";
import Link from "next/link";
import { Provider } from "react-redux";
import store from "./store";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import URLState from "./query-parameters";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <Provider store={store}>
      <div id="wd-lab4" className="container">
        <h3>Lab 4</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link href="/labs/lab4/redux">Redux Examples</Link>
          </li>
          <li className="list-group-item">
            <Link href="/labs/lab4/react-context">React Context Examples</Link>
          </li>
          <li className="list-group-item">
            <Link href="/labs/lab4/zustand">Zustand Examples</Link>
          </li>
        </ul>
        <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />
      <URLState />
      </div>
    </Provider>
  );
}
