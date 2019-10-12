import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Owners from "./components/Owners";
import Home from "./components/Home";
import TeamSummary from "./components/TeamSummary";
import PlayerSummary from "./components/PlayerSummary";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/owners" component={Owners} />
          <Route exact path="/fantasyTeams/:id" component={TeamSummary} />
          <Route exact path="/players/:id" component={PlayerSummary} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
