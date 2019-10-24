import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Owners from "./components/Owners";
import Home from "./components/Home";
import TeamSummary from "./components/TeamSummary";
import PlayerSummary from "./components/PlayerSummary";
import Auctions from "./components/Auctions";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/owners" component={Owners} />
          <Route exact path="/fantasyTeams/:id" component={TeamSummary} />
          <Route exact path="/players/:id" component={PlayerSummary} />
          <Route exact path="/auctions/:id" component={Auctions} />
          <Route exact path="/auctions/" component={Auctions} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
