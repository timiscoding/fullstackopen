import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "../../routes";
import Header from "../Header";

// FIXME unify all components to use same styling method
function App() {
  return (
    <Router>
      <Header />
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          component={route.main}
          exact={route.exact}
        />
      ))}
    </Router>
  );
}

export default App;
