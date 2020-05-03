import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import StatTable from "../StatTable";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { config } from "../../api";

import { GiTrophy } from "react-icons/gi";
import { GiPodiumSecond } from "react-icons/gi";
import { GiPodiumThird } from "react-icons/gi";

function Owner(props) {
  const [owner, setOwner] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ownerID = props.match.params.id;
    const fetchData = async () => {
      const result = await axios(`${config}/owners/${ownerID}.json`);
      setOwner((result && result.data && result.data.owner) || {});
      setLoading(false);
    };
    fetchData();
  }, [props.match.params.id]);

  const fantasyTeams = owner.fantasyTeams || [];
  const cumulativeStats = owner.cumulativeStats || {};
  const versusRecords = owner.versusRecords || [];
  versusRecords.forEach(
    (record) =>
      (record.winPct =
        Math.round((record.wins / (record.wins + record.losses)) * 100) / 100)
  );

  return (
    <div>
      {loading && <Spinner className="spinner" animation="border" />}
      {!loading && (
        <>
          <Jumbotron>
            <h1 className="header">{owner.name}</h1>
            <Badge variant="secondary" className="owner__badge">
              Record: {cumulativeStats.totalWins} -{" "}
              {cumulativeStats.totalGames - cumulativeStats.totalWins}
            </Badge>
            <Badge variant="secondary" className="owner__badge">
              Total Points: {cumulativeStats.totalPoints}
            </Badge>
            <Badge variant="secondary" className="owner__badge">
              Playoff Wins: {cumulativeStats.totalPlayoffWins}
            </Badge>
          </Jumbotron>
          <div className="owner-body">
            {fantasyTeams.map((team) => (
              <Card style={{ width: "30rem" }} className="owner-body__card">
                <Card.Body>
                  <div className="trophy">
                    <Trophy team={team} />
                  </div>
                  <Card.Title>
                    {team.year} - {team.name}
                  </Card.Title>
                  <Card.Text>
                    Record: ({team.seasonWins} - {13 - team.seasonWins})
                    <br></br>
                    Points: {Math.round(team.seasonPoints)}
                  </Card.Text>
                  <Button variant="primary" href={`/fantasyTeams/${team.id}`}>
                    Go to team
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
          <div className="owner-body">
            <StatTable
              title="Versus Records"
              history={props.history}
              statData={versusRecords}
              chosenColumns={[
                "id",
                "name",
                "wins",
                "losses",
                "winPct",
                "streak",
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
}

function Trophy({ team }) {
  if (team["wonChampionship?"]) {
    return <GiTrophy />;
  } else if (team["madeFinals?"]) {
    return <GiPodiumSecond />;
  } else if (team["madePlayoffs?"]) {
    return <GiPodiumThird />;
  }
  return null;
}

export default Owner;
