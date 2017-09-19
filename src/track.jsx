import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, IndexRoute, browserHistory } from "react-router";

import "./static/css/style.css";

import App from "./components/App";
import NoMatch from "./components/NoMatch";
import Track from "./components/Track";

const AppRoutes = (
    <Router history={browserHistory}>
        <Route name="Home" path="/" component={App}>
            <IndexRoute component={Track}></IndexRoute>
            <Route name="404: No Match for route" path="*" component={NoMatch} />
        </Route>
    </Router>
);

ReactDOM.render(AppRoutes, document.getElementById("app"));