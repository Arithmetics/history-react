import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { config } from "../api";
import StatTable from "./StatTable";

function AllPlayers({ match, history }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${config}/players.json`);
      setPlayers(result && result.data && result.data.players);
      console.log(result.data.players);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">All Players</h1>
        </Jumbotron>
        {loading && <Spinner className="spinner" animation="border" />}
        {!loading && (
          <div>
            <StatTable
              history={history}
              statData={players}
              chosenColumns={[
                "id",
                "playerName",
                "careerStats.position",
                "careerStats.totalStarts",
                "careerStats.totalPoints",
                "careerStats.playoffPoints",
                "careerStats.finalsPoints",
                "careerStats.championships",
                "careerStats.totalAuctionMoney",
                "careerStats.highestAuctionMoney",
                "careerStats.bestStart",
                "careerStats.bestRegRank",
                "careerStats.bestPprRank"
              ]}
            />
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPlayers;
