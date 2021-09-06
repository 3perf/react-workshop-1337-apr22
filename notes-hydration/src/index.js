import React from "react";
import ReactDOM from "react-dom";
// React 18:
// import ReactDOM from "react-dom/client";
import AppWrapper from "./app-wrapper";

const root = document.getElementById("root");
const isServerSideRenderingEnabled = root.innerHTML.trim().length > 0;
if (isServerSideRenderingEnabled) {
  ReactDOM.hydrate(<AppWrapper />, root);
  // React 18:
  // ReactDOM.hydrateRoot(root, <AppWrapper />);
} else {
  ReactDOM.render(<AppWrapper />, root);
  // React 18:
  // ReactDOM.createRoot(root).render(<AppWrapper />);
}
