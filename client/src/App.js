import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";

import AdminApp from "./views/home/adminApp";
import StudentApp from "./views/home/StudentApp";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <StudentApp></StudentApp>
          </Route>
          <Route path="/admin">
            <AdminApp></AdminApp>
          </Route>
          <Route path="/github" loc="https://github.com/cartory" />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
