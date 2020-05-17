import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";
import Owners from "./components/owners/Owners";
import Owner from "./components/owners/Owner";
import MainWrapper from "./components/wrapper/MainWrapper";
import TeamSummary from "./components/TeamSummary";
import PlayerSummary from "./components/players/PlayerSummary";
import AllPlayers from "./components/players/AllPlayers";
import Auctions from "./components/Auctions";
import Podcasts from "./components/Podcasts";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <BrowserRouter>
          <MainWrapper>
            <Switch>
              <Route exact path="/" component={null} />
              <Route exact path="/owners/:id" component={Owner} />
              <Route exact path="/owners" component={Owners} />
              <Route exact path="/fantasyTeams/:id" component={TeamSummary} />
              <Route exact path="/players/:id" component={PlayerSummary} />
              <Route exact path="/players" component={AllPlayers} />
              <Route exact path="/auctions/:id" component={Auctions} />
              <Route exact path="/auctions/" component={Auctions} />
              <Route exact path="/podcasts/" component={Podcasts} />
            </Switch>
          </MainWrapper>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
