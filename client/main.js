import React from "react";
import { render } from "react-dom";
import "./main.css";
import App from "../imports/ui/containers/App";

import { Meteor } from "meteor/meteor";
// import * as serviceWorker from "./serviceWorker";

Meteor.startup(() => {
  render(<App />, document.getElementById("root"));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
