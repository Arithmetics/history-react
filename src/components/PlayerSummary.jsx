import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { config } from "../api";
import StatTable from "./StatTable";

function PlayerSummary({ match, history }) {
  const [player, setPlayer] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const playerID = match.params.id;
    const fetchData = async () => {
      const result = await axios(`${config}/players/${playerID}.json`);
      setPlayer((result && result.data && result.data.player) || {});
      setLoading(false);
    };
    fetchData();
  }, [match.params.id]);

  const playerName = player && player.name;
  const fantasyStarts = (player && player.fantasyStarts) || [];
  const auction = (player && player.purchases) || [];
  const seasonStats = (player && player.seasonStats) || [];

  return (
    <div>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">Player Summary</h1>
          {!loading && <h2>{playerName}</h2>}
        </Jumbotron>
        {loading && <Spinner className="spinner" animation="border" />}
        {!loading && (
          <div>
            {auction.length > 0 && (
              <StatTable
                title="Auctions"
                history={history}
                statData={auction}
                chosenColumns={[
                  "year",
                  "position",
                  "owner.name",
                  "fantasyTeam.name",
                  "fantasyTeam.id",
                  "price"
                ]}
              />
            )}
            <hr></hr>
            <StatTable
              title="Season Stats"
              history={history}
              statData={seasonStats}
              chosenColumns={[
                "year",
                "gamesPlayed",
                "ageAtSeason",
                "experienceAtSeason",
                "fantasyPointsReg",
                "fantasyPointsPpr",
                "rankReg",
                "rankPpr"
              ]}
            />
            <hr></hr>
            <StatTable
              title="Fantasy Starts"
              history={history}
              statData={fantasyStarts}
              chosenColumns={[
                "year",
                "week",
                "position",
                "points",
                "owner.name",
                "fantasyTeam.id",
                "fantasyTeam.name"
              ]}
            />
          </div>
        )}
      </Container>
    </div>
  );
}

export default PlayerSummary;
