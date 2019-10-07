import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Owners from "./Owners";
import Home from "./Home";
import TeamSummary from "./TeamSummary";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/owners" component={Owners} />
          <Route exact path="/fantasyTeams/:id" component={TeamSummary} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
