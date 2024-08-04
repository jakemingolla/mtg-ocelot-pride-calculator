import * as ReactDOM from "react-dom/client";
import * as React from "react";
import { Component } from "./component";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>,
);
