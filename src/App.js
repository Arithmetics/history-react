import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Owners from "./components/Owners";
import Owner from "./components/Owner";
import Home from "./components/Home";
import TeamSummary from "./components/TeamSummary";
import PlayerSummary from "./components/PlayerSummary";
import AllPlayers from "./components/AllPlayers";
import Auctions from "./components/Auctions";
import NavBar from "./components/NavBar";
import Podcasts from "./components/Podcasts";

function App() {
  console.log(process.env.NODE_ENV);
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/owners/:id" component={Owner} />
          <Route exact path="/owners" component={Owners} />
          <Route exact path="/fantasyTeams/:id" component={TeamSummary} />
          <Route exact path="/players/:id" component={PlayerSummary} />
          <Route exact path="/players" component={AllPlayers} />
          <Route exact path="/auctions/:id" component={Auctions} />
          <Route exact path="/auctions/" component={Auctions} />
          <Route exact path="/podcasts/" component={Podcasts} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
