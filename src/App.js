import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// pick a date util library
import MomentUtils from '@date-io/moment';

import store from './store/store';
import theme from './theme';
import Owners from './components/owners/Owners';
import Owner from './components/owners/Owner';
import MainWrapper from './components/wrapper/MainWrapper';
import TeamSummary from './components/fantasyTeam/TeamSummary';
import PlayerSummary from './components/players/PlayerSummary';
import AllPlayers from './components/players/AllPlayers';
import Auctions from './components/Auctions';
import Podcasts from './components/Podcasts';
import HomePage from './components/homePage/HomePage';
import Login from './components/users/Login';
import Admin from './components/admin/Admin';
import ManyLabCards from './components/homePage/ManyLabCards';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <div>
            <BrowserRouter>
              <MainWrapper>
                <Switch>
                  <Route exact path="/" component={ManyLabCards} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/home" component={HomePage} />
                  <Route exact path="/owners/:id" component={Owner} />
                  <Route exact path="/owners" component={Owners} />
                  <Route
                    exact
                    path="/fantasyTeams/:id"
                    component={TeamSummary}
                  />
                  <Route
                    exact
                    path="/players/:id"
                    component={PlayerSummary}
                  />
                  <Route
                    exact
                    path="/players"
                    component={AllPlayers}
                  />
                  <Route
                    exact
                    path="/auctions/:id"
                    component={Auctions}
                  />
                  <Route
                    exact
                    path="/auctions/"
                    component={Auctions}
                  />
                  <Route
                    exact
                    path="/podcasts/"
                    component={Podcasts}
                  />
                  <Route exact path="/admin/" component={Admin} />
                </Switch>
              </MainWrapper>
            </BrowserRouter>
          </div>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
