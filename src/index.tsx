import React from "react";
import { Root, createRoot } from "react-dom/client";
import "./index.css";
import App from "./ui/App";
import store from "./state";
import { Store } from "redux";
import { Provider } from "react-redux";

renderApp(createRoot(document.getElementById("root")!), store);

function renderApp(rootElement: Root, reduxStore: Store) {
  rootElement.render(
    <Provider store={reduxStore}>
      <App />
    </Provider>,
  );
}
