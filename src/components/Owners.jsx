import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import StatTable from "./StatTable";
import { config } from "../api";

function Owners(props) {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${config}/owners.json`);
      setOwners((result && result.data && result.data.owners) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">Owners</h1>
        </Jumbotron>
        <div className="owners">
          {loading && <Spinner className="spinner" animation="border" />}
          {!loading && (
            <StatTable
              history={props.history}
              statData={owners}
              chosenColumns={[
                "name",
                "cumulativeStats.totalPoints",
                "cumulativeStats.totalGames",
                "cumulativeStats.totalWins",
                "cumulativeStats.pointsPerGame",
                "cumulativeStats.totalPlayoffPoints",
                "cumulativeStats.totalPlayoffGames",
                "cumulativeStats.playoffPointsPerGame"
              ]}
            />
          )}
        </div>
      </Container>
    </div>
  );
}

export default Owners;
